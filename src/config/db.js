const mongoose = require("mongoose");
require("dotenv").config();

const URI = process.env.MONGO_URI;

async function ConnectDB() {
  try {
    await mongoose.connect(URI);
    console.log("DB connected");
  } catch (error) {
    console.log("Error connecting to database", error);
    process.exit(1);
  }
}

module.exports = ConnectDB;
