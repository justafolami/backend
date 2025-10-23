const mongoose = require("mongoose");

const rewardSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  txHash: { type: String },
  status: {
    type: String,
    enum: ["pending", "completed", "failed"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Reward", rewardSchema);
