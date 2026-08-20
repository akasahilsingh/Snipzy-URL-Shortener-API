const express = require("express");

const router = express.Router();
const { shortUrlController, redirectUrlController, getAnalyticsController } = require("../controller/url.controller.js");

router.post("/url", shortUrlController);
router.get("/:shortId", redirectUrlController)
router.get("/:shortId/analytics", getAnalyticsController)

module.exports = router;
