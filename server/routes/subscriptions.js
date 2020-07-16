const express = require("express");
const router = express.Router();
const errorResponse = require("../utils/error");
const ChannelSubscription = require("../models/channelSubscription");

// Subscribe to a channel
router.post("/", async (req, res) => {
  req.userId = "5edeb0185d791c662f246289";
  const subscriber = req.userId;
  const { channel } = req.body;

  if (!channel) {
    res.status(400).json({
      name: "SubscriptionError",
      message: "Invalid subscription",
    });
  }
  try {
    await ChannelSubscription.create({
      channel,
      subscriber,
    });
    res.json({
      message: "success",
    });
  } catch (err) {
    res.status(500).json({
      name: "ServerError",
      message: err.message,
    });
  }
});

// Unsubscribe to a channel
router.delete("/", async (req, res) => {
  req.userId = "5edeb0185d791c662f246289";
  const subscriber = req.userId;
  const { channel } = req.body;

  if (!channel) {
    res.status(400).json({
      name: "SubscriptionError",
      message: "Invalid subscription",
    });
  }
  try {
    await ChannelSubscription.findOneAndDelete({
      channel,
      subscriber,
    });
    res.json({
      message: "success",
    });
  } catch (err) {
    res.status(500).json({
      name: "ServerError",
      message: err.message,
    });
  }
});

module.exports = router;
