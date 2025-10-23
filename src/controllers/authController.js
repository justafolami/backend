const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { email, password, walletAddress } = req.body;

    const existingUser = await User.findOne({
      $or: [{ email }, { walletAddress }],
    });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword, walletAddress });
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res
      .status(201)
      .json({ token, user: { id: user._id, email, walletAddress } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        walletAddress: user.walletAddress,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
