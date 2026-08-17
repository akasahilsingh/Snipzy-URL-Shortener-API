const express = require("express");

const router = express.Router();
const { shortUrlController, redirectUrlController } = require("../controller/url.controller.js");

router.post("/url", shortUrlController);
router.get("/:shortId", redirectUrlController)

module.exports = router;
