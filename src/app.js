const express = require("express");
const cors = require("cors");
const hpp = require("hpp");
require("dotenv").config();
const rateLimiter = require("./middleware/rateLimiter");
const authRoutes = require("./routes/authRoutes");
const stepsRoutes = require("./routes/stepsRoutes");
const rewardRoutes = require("./routes/rewardRoutes");

const app = express();

app.use(express.json());
app.use(hpp());
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["POST", "PUT", "GET", "DELETE"],
  })
);
app.use(rateLimiter);
app.use("/api/auth", authRoutes);
app.use("/api/steps", stepsRoutes);
app.use("/api/rewards", rewardRoutes);

app.get("/api/v1/health", (req, res) => {
  res.status(200).json({ success: true, message: "Server is working!" });
});

module.exports = app;
