const express = require("express");

const router = express.Router();
const { shortUrlController, redirectUrlController, getAnalyticsController } = require("../controller/url.controller.js");
const { authMiddleware } = require("../middleware/auth.middleware.js");

router.post("/url",authMiddleware, shortUrlController);
router.get("/:shortId",authMiddleware, redirectUrlController)
router.get("/:shortId/analytics",authMiddleware, getAnalyticsController)

module.exports = router;
