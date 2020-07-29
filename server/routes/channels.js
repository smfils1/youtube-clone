const express = require("express");
const router = express.Router();

const Channel = require("../models/channel");
const errorResponse = require("../utils/error");

//Get channel based on user auth
router.get("/owner", async (req, res) => {
  try {
    if (req.userError) throw req.userError;
    //Get user by id
    const channel = await Channel.findById(req.userId);
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

//Get channel by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    //Get user by id
    const channel = await Channel.findById(id);
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
