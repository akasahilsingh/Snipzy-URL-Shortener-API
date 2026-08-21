const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("../model/user.model");
const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.cookie;
    console.log("auth header", authHeader);
    if (!authHeader) {
      return res.status(401).json({
        message: "Autherization required",
      });
    }

    const accessToken = authHeader.split("=")[1];
    console.log("access token from header", accessToken);

    const decoded = jwt.verify(accessToken, JWT_SECRET);

    next();
  } catch (error) {
    console.log("Error while login: ", error.message);
    return res.status(500).json({
      message: "Error while login",
    });
  }
};

module.exports = { authMiddleware };
