const express = require("express");
const router = express.Router();

const Channel = require("../models/channel");
const errorResponse = require("../utils/error");

router.get("/", async (req, res) => {
  try {
    //Get user by id
    const channel = await Channel.findById({ _id: req.userId });
    if (!channel) {
      throw {
        name: "InvalidResourceError",
        message: "Invalid video",
      };
    }
    res.json({
      id: channel._id,
      name: channel.name,
      email: channel.email,
      imageLink: channel.imageLink,
    });
  } catch (err) {
    errorResponse(err, res);
  }
});

module.exports = router;
