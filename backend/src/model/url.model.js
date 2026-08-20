const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      require: true,
      unique: true,
    },
    url: {
      type: String,
      require: true,
    },
    viewHistory: [
      {
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true },
);

const urlModel = mongoose.model("urlModel", urlSchema);

module.exports = urlModel;
