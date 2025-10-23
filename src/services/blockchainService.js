const { rewardContract } = require("../config/blockchain");
const Steps = require("../models/Steps");

exports.syncStepsToBlockchain = async () => {
  try {
    const unsyncedSteps = await Steps.find({ synced: false }).populate(
      "userId"
    );

    for (const step of unsyncedSteps) {
      const tx = await rewardContract.recordSteps(
        step.userId.walletAddress,
        step.steps
      );
      await tx.wait();

      step.synced = true;
      await step.save();
    }

    console.log("Steps synced to blockchain");
  } catch (error) {
    console.error("Sync error:", error);
  }
};
