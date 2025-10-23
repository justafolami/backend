const express = require("express");
const { recordSteps, getSteps } = require("../controllers/stepsController");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/", auth, recordSteps);
router.get("/", auth, getSteps);

module.exports = router;
