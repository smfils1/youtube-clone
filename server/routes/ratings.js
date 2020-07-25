const express = require("express");
const router = express.Router();
const errorResponse = require("../utils/error");

const Rating = require("../models/rating");
const Video = require("../models/video");

// ratingType = comment OR video

// Get likes & dislike of ratingType
router.get("/:ratingType/:ratingTypeId", async (req, res) => {
  const { userId } = req;
  const { ratingType, ratingTypeId } = req.params;
  const { videoId } = req.body;
  let ratings;
  try {
    if (ratingType === "comment") {
      videoId = await Rating.getVideoByCommentId(ratingTypeId);
    }
    const video = await Video.getVideo({ userId, videoId });
    if (video) {
      ratings = await Rating.getRating({ ratingType, ratingTypeId });
    }
    res.json({ ratings });
  } catch (err) {
    errorResponse(err, res);
  }
});

// Likes & dislike a ratingType
router.post("/:ratingType/:ratingTypeId", async (req, res) => {
  const { userId } = req;
  const { ratingType, ratingTypeId } = req.params;
  const { rating, videoId } = req.body;
  let newRating;
  try {
    const video = await Video.getVideo({ userId, videoId });
    if (video) {
      newRating = await VideoRating.createRating({
        userId,
        rating,
        ratingType,
        ratingTypeId,
      });
    }
    res.json({ rating: newRating });
  } catch (err) {
    errorResponse(err, res);
  }
});

// Update likes & dislike on ratingType
router.patch("/:ratingType/:ratingTypeId", async (req, res) => {
  const { userId } = req;
  const { ratingType, ratingTypeId } = req.params;
  const { rating, videoId } = req.body;

  let updatedRating;
  try {
    const video = await Video.getVideo({ userId, videoId });
    if (video) {
      updatedRating = await VideoRating.updateRatingByUserId({
        ratingType,
        ratingTypeId,
        userId,
        rating,
      });
    }
    res.json({ rating: updatedRating });
  } catch (err) {
    errorResponse(err, res);
  }
});

module.exports = router;
