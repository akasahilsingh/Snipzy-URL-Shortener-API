const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
  // userName: {
  //   type: String,
  //   require: [true, "user name is required"],
  //   unique: [true, "user name must be unique"],
  // },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: [true, "email must be unique"],
  },

  password: {
    type: String,
    required: [true, "password is required"],
  },
});

const authModel = mongoose.model("authModel", authSchema);

module.exports = authModel;
