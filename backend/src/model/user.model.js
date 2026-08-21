const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: [String, "name should be only string"],
        // required: [true, "name is required to continue"]
    }, 
    email: {
        type: String,
        required: [true, "email is required to continue"],
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

const userModel = mongoose.model("userModel", userSchema)

module.exports = userModel