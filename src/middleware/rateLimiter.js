const limiter = require("express-rate-limit");

const rateLimiter = limiter({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests, please try again later",
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = rateLimiter;
