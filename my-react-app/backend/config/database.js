const mongoose = require("mongoose");

const connectDB = async () => {
  console.log("db",process.env.DB_URI);
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("Connected to database!");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = connectDB;
