const express = require("express");
const router = express.Router();
const errorResponse = require("../utils/error");
const ChannelSubscription = require("../models/channelSubscription");

// Subscribe to a channel
router.post("/", async (req, res) => {
  const subscriber = req.userId;
  const { channel } = req.body;

  if (!channel) {
    errorResponse(
      {
        name: "InvalidResourceError",
        message: "Invalid subscription",
      },
      res
    );
  }
  try {
    await ChannelSubscription.create({
      channel,
      subscriber,
    });
    res.json({
      success: true,
    });
  } catch (err) {
    errorResponse(err, res);
  }
});

// Check if subscribed
router.post("/subscribed", async (req, res) => {
  const subscriber = req.userId;
  const { channel } = req.body;
  if (!channel) {
    errorResponse(
      {
        name: "InvalidResourceError",
        message: "Invalid subscription",
      },
      res
    );
  }
  try {
    const subscription = await ChannelSubscription.findOne({
      channel,
      subscriber,
    });
    res.json({
      isSubscribed: !!subscription,
    });
  } catch (err) {
    errorResponse(err, res);
  }
});

// Get number of subscriptions
router.post("/count", async (req, res) => {
  const { channel } = req.body;

  if (!channel) {
    return res.status(400).json({
      name: "SubscriptionError",
      message: "Invalid Channel",
    });
  }
  try {
    const count = await ChannelSubscription.countDocuments({
      channel,
    });
    res.json({
      subscribers: count,
    });
  } catch (err) {
    res.status(500).json({
      name: "ServerError",
      message: err.message,
    });
  }
});

// Unsubscribe to a channel
router.delete("/:id", async (req, res) => {
  //req.userId = "5edeb0185d791c662f246289";
  const subscriber = req.userId;
  const { id } = req.params;

  try {
    await ChannelSubscription.findOneAndDelete({
      channel: id,
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
