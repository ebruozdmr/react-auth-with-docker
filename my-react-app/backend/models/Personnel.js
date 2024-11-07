const mongoose = require("mongoose");

const personnelSchema = new mongoose.Schema(
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
    sicilNo: {
      type: Number,
      required: true,
    },
    tcKimlikNo: {
      type: Number,
      required: true,
    },
    kota: {
      type: Number,
      required: true,
    },
    kullanılanIzin: {
      type: Number,
      required: true,
    },
    kalanIzin: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Personnel", personnelSchema);
