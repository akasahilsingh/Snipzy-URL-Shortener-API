const urlModel = require("../model/url.model.js");
const { nanoid } = require("nanoid");

const shortUrlController = async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({
        message: "URL is needed to continue",
      });
    }
    const shortId = nanoid(8);
    const data = await urlModel.create({
      shortId,
      url,
    });
    return res.status(201).json({
      message: "Url shortend successfully",
      shortId,
      shortUrl: `http://localhost:3000/${shortId}`,
    });
  } catch (error) {
    console.log("There is error: ", error.message);
    res.status(400).json({
      message: "Something went wrong",
    });
  }
};

const redirectUrlController = async (req, res) => {
  try {
    const { shortId } = req.params;
    console.log("Short idfrom req", shortId)
    if (!shortId) {
      return res.status(400).json({
        message: "Short id is required to continue",
      });
    }

    const findShortId = await urlModel.findOne({
      shortId,
    });
    console.log("SHort id in db", findShortId);

    if (!findShortId) {
      return res.status(404).json({
        message: "This is short id is not registered",
      });
    }

    res.redirect(findShortId.url);
  } catch (error) {
    console.log("There is an error while redirecting the url: ", error.message);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

module.exports = { shortUrlController, redirectUrlController };
