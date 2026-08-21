const express = require("express");
require("dotenv").config();
const connectDB = require("./db/db.js");
const urlShortRoute = require("./routes/url.routes.js");
const authRoute = require("./routes/auth.routes.js")

const app = express();
connectDB();

app.use(express.json());

app.use("/api", urlShortRoute);
// app.use("/", urlShortRoute); 
app.use("/api", authRoute)

module.exports = app;
