const Personnel = require("../models/Personnel.js");

const getPersonnelList = async (req, res) => {
  try {
    const personnelList = await Personnel.find();
    if (!personnelList) {
      return res.status(404).json({ message: "Personel kaydı bulunamadı!" });
    }
    res.status(200).json(personnelList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPersonnel = async (req, res) => {
  const { sicilNo } = req.body;
  console.log(sicilNo);
  try {
    const personnel = await Personnel.findOne({ sicilNo });
    if (!personnel) {
      return res.status(404).json({ message: "Böyle bir personel bulunamadı!" });
    }
    res.status(200).json(personnel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createPersonnel = async (req, res) => {
  try {
    const personnel = await Personnel.create(req.body);
    res.status(201).json(personnel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getPersonnelList, getPersonnel, createPersonnel };
