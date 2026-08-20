const express = require("express");
const {
  registerController,
  loginController,
  logoutController,
} = require("../controller/auth.controller");

const router = express.Router();

router.post("/auth/register", registerController);
router.post("/auth/login", loginController);
router.post("/auth/logout", logoutController);

module.exports = router;
