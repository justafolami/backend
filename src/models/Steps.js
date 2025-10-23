const mongoose = require("mongoose");

const stepsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  steps: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  synced: { type: Boolean, default: false },
});

module.exports = mongoose.model("Steps", stepsSchema);
