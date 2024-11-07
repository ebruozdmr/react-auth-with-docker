const mongoose = require("mongoose");

const authSchema = new mongoose.Schema(
  {
    ad: {
      type: String,
      required: true,
      trim: true,
    },
    soyad: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    // isAdmin: {
    //   type: Boolean,
    //   default: false,
    // },
    role: {
      type: String,
      default: "user",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Auth", authSchema);
