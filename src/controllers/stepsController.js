const Steps = require("../models/Steps");
const User = require("../models/User");

exports.recordSteps = async (req, res) => {
  try {
    const { steps } = req.body;
    const userId = req.userId;

    const stepRecord = new Steps({ userId, steps });
    await stepRecord.save();

    await User.findByIdAndUpdate(userId, { $inc: { totalSteps: steps } });

    res.status(201).json({ message: "Steps recorded", stepRecord });
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
