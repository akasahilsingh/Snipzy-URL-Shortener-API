const express = require("express");
require("dotenv").config();
const connectDB = require("./db/db.js");
const urlShortRoute = require("./routes/url.routes.js");
const authRoute = require("./routes/auth.routes.js");
const cookieParser = require("cookie-parser");

const app = express();
connectDB();

app.use(express.json());
app.use(cookieParser());

app.use("/api", urlShortRoute);
// app.use("/", urlShortRoute);
app.use("/api", authRoute);

module.exports = app;
