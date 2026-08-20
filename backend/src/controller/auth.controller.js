const authModel = require("../model/auth.model.js");
const urlModel = require("../model/url.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const registerController = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("email: ", email, "password from frontend", password);
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password is required to continue",
      });
    }

    const foundUser = await urlModel.findOne({
      email,
    });

    if (foundUser) {
      return res.status(404).json({
        message: "User is already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const accesToken = await jwt.sign({ email }, JWT_SECRET, {
      expiresIn: "15m",
    });
    const refreshToken = await jwt.sign({ email }, JWT_SECRET, {
      expiresIn: "7d",
    });
    const userRegister = await authModel.create({
      email,
      password: hashedPassword,
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(201).json({
      message: "User registered succesfully",
      userRegister,
      accesToken,
    });
  } catch (error) {
    console.log(
      "There is an error while registering the user: ",
      error.message,
    );
    return res.status(500).json({
      message: "There is an error while registering the user",
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(404).json({
        message: "Email and password is required to continue",
      });
    }

    const user = await authModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User is not registered",
      });
    }

    const isMatchPassword = await bcrypt.compare(password, user.password);

    if (!isMatchPassword) {
      return res.status(404).json({
        messsage: "Wrong credentials",
      });
    }

    const accesToken = await jwt.sign({ email }, JWT_SECRET, {
      expiresIn: "15m",
    });

    const refreshToken = await jwt.sign({ email }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Login successfully",
      accesToken,
    });
  } catch (error) {
    console.log("Error while login: ", error.message);
    return res.status(500).json({
      message: "Error while login",
    });
  }
};

const logoutController = async (req, res) => {
  try {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    return res.status(200).json({
      message: "Logged Out Successfully",
    });
  } catch {
    console.log("Error while logut: ", error.message);
    return res.status(500).json({
      message: "Error while logout",
    });
  }
};

module.exports = { registerController, loginController, logoutController };
