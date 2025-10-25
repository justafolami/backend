const Steps = require("../models/Steps");
const User = require("../models/User");

exports.recordSteps = async (req, res) => {
  try {
    const { steps } = req.body;
    const userId = req.userId;

    const userSteps = await Steps.findOneAndUpdate(
      { userId: userId, noOfTimesSyncedToday: { $lt: 3 } },
      {
        $inc: { noOfTimesSyncedToday: 1 },
        $set: { steps: steps },
      },
      { new: true, runValidators: true }
    );

    if (!userSteps) {
      const existingUserSteps = await Steps.findById(userId);
      if (existingUserSteps && existingUserSteps.noOfTimesSyncedToday >= 3) {
        return res
          .status(400)
          .json({ message: "Maximum amount of syncs reached for today (3)" });
      }
      return res.status(404).json({ message: "User steps document not found" });
    }

    await User.findByIdAndUpdate(userId, { $inc: { totalSteps: steps } });

    res.status(201).json({ message: "Steps recorded", stepRecord: userSteps });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSteps = async (req, res) => {
  try {
    const userId = req.userId;
    const steps = await Steps.find({ userId }).sort({ date: -1 });
    const user = await User.findById(userId);

    res.json({ totalSteps: user.totalSteps, steps });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
