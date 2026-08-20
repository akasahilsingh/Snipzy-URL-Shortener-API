const mongoose = require("mongoose");
const URI = process.env.MONGO_URI;
const connectDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Successfully connected to database");
  } catch (error) {
    console.log("There is an error while connecting to db: ", error.message);
  }
};

module.exports = connectDB;