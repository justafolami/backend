const express = require("express");
const { claimReward, getRewards } = require("../controllers/rewardsController");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/claim", auth, claimReward);
router.get("/", auth, getRewards);

module.exports = router;
