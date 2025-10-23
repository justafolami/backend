const Reward = require("../models/Reward");
const User = require("../models/User");
const { rewardContract } = require("../config/blockchain");

exports.claimReward = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);

    const pendingReward = await rewardContract.getPendingReward(
      user.walletAddress
    );

    if (pendingReward.toString() === "0") {
      return res.status(400).json({ error: "No rewards available" });
    }

    const tx = await rewardContract.claimReward({ from: user.walletAddress });
    await tx.wait();

    const reward = new Reward({
      userId,
      amount: pendingReward.toString(),
      txHash: tx.hash,
      status: "completed",
    });
    await reward.save();

    res.json({
      message: "Reward claimed",
      txHash: tx.hash,
      amount: pendingReward.toString(),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRewards = async (req, res) => {
  try {
    const userId = req.userId;
    const rewards = await Reward.find({ userId }).sort({ createdAt: -1 });
    res.json({ rewards });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
