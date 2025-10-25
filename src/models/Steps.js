const mongoose = require("mongoose");

const stepsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  steps: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  synced: { type: Boolean, default: false },
  noOfTimesSyncedToday: {
    type: Number,
    default: 0,
    max: [3, "Maximum no of times is 3."],
  },
});

module.exports = mongoose.model("Steps", stepsSchema);
