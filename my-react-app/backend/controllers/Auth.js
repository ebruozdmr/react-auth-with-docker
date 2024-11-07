const Auth = require("../models/Auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Kullanıcı Kaydı
const register = async (req, res) => {
  try {
    const { ad, soyad, email, password } = req.body;
    const user = await Auth.findOne({ email });
    if (user) {
      return res.status(409).json("Bu email zaten kayıtlı!");
    }
    if (!validateEmail(email)) {
      return res.status(400).json("Geçersiz email adresi!");
    }
    if (!validatePassword(password)) {
      return res.status(400).json("Geçersiz formatta şifre!");
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await Auth.create({
      ...req.body,
      password: hashedPassword,
    });
    const userToken = jwt.sign(
      { id: newUser._id, isAdmin: newUser.isAdmin },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    // ???????
    // const cookiesOptions = {
    //   httpOnly: true,
    //   expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    // };

    res
      .status(201)
      .cookie("userToken", userToken, { httpOnly: true, maxAge: 3600000 }) //?????
      .json({
        status: "OK",
        newUser: { ad: newUser.ad, soyad: newUser.soyad, email: newUser.email },
        userToken,
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//return boolean
const validateEmail = (email) => {
  const regExp =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regExp.test(String(email).toLowerCase()); //??????
};

const validatePassword = (password) => {
  const regExp =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{6,12}$/;
  return regExp.test(password);
};

//Kullanıcı Girişi
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Auth.findOne({ email });
    if (!user) {
      return res.status(404).json("Böyle bir kullanıcı bulunamadı!");
    }
    const comparedPassword = await bcrypt.compare(password, user.password); // return boolean
    if (!comparedPassword) {
      return res.status(401).json({ message: "Şifre hatalı!" });
    }
    const userToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );
    res
      .cookie("userToken", userToken, { httpOnly: true, maxAge: 3600000 })
      .status(200)
      .json({
        status: "OK",
        user: { ad: user.ad, soyad: user.soyad, email: user.email },
        userToken,
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//token cookie'den silinecek
const logout = async (req, res) => {
  //??????
  const cookieOptions = {
    httpOnly: true,
    expires: new Date(Date.now()),
  };
  res
    .status(200)
    .cookie("userToken", null, cookieOptions)
    .json({ message: "Oturum başarıyla sonlandırıldı!" });
};

//Şifremi unuttum
const forgotPassword = async (req, res) => {};

//Şifresini unutan kullanıcıya reset token gönderilecek
const resetPassword = async (req, res) => {};

module.exports = { register, login, logout, forgotPassword, resetPassword };
