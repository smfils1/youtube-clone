const express = require("express");
const router = express.Router();
const errorResponse = require("../utils/error");
const { auth } = require("../middleware/auth");

const Rating = require("../models/rating");
const Video = require("../models/video");

//TODO: make better endpoints

// ratingType = comment OR video

// Get user's likes & dislike of ratingType
router.get(
  "/user/:ratingType/:videoId/:ratingTypeId",
  auth,
  async (req, res) => {
    const { userId } = req;
    const { ratingType, ratingTypeId, videoId } = req.params;
    let ratings;
    try {
      const video = await Video.getVideo({ userId, videoId });
      if (video) {
        rating = await Rating.getUserRating({
          userId,
          ratingType,
          ratingTypeId,
        });
      }
      res.json(rating);
    } catch (err) {
      console.log(err);
      errorResponse(err, res);
    }
  }
);
// Get likes & dislike of ratingType
router.get("/:ratingType/:videoId/:ratingTypeId", async (req, res) => {
  const { userId } = req;
  const { ratingType, ratingTypeId, videoId } = req.params;
  let ratings;
  try {
    const video = await Video.getVideo({ userId, videoId });
    if (video) {
      ratings = await Rating.getRating({ ratingType, ratingTypeId });
    }
    res.json({ ratings });
  } catch (err) {
    // console.log(err);
    errorResponse(err, res);
  }
});

// Likes & dislike a ratingType
router.post("/:ratingType/:videoId/:ratingTypeId", auth, async (req, res) => {
  const { userId } = req;
  const { ratingType, ratingTypeId, videoId } = req.params;
  const { rating } = req.body;
  let newRating;
  try {
    const video = await Video.getVideo({ userId, videoId });
    if (video) {
      newRating = await Rating.createRating({
        userId,
        rating,
        ratingType,
        ratingTypeId,
      });
    }
    res.json({ rating: newRating });
  } catch (err) {
    console.log(err);
    errorResponse(err, res);
  }
});

// Update likes & dislike on ratingType
router.patch("/:ratingType/:videoId/:ratingTypeId", async (req, res) => {
  const { userId } = req;
  const { ratingType, ratingTypeId, videoId } = req.params;
  const { rating } = req.body;

  let updatedRating;
  try {
    const video = await Video.getVideo({ userId, videoId });
    if (video) {
      updatedRating = await Rating.updateRatingByUserId({
        ratingType,
        ratingTypeId,
        userId,
        rating,
      });
    }
    res.json({ rating: updatedRating });
  } catch (err) {
    console.log(err);
    errorResponse(err, res);
  }
});

router.delete("/:ratingType/:videoId/:ratingTypeId", auth, async (req, res) => {
  const { userId } = req;
  const { ratingType, ratingTypeId, videoId } = req.params;

  try {
    const video = await Video.getVideo({ userId, videoId });
    if (video) {
      await Rating.findOneAndDelete({
        ratingType,
        [ratingType + "Id"]: ratingTypeId,
        userId,
      });
      console.log({
        ratingType,
        [ratingType + "Id"]: ratingTypeId,
        userId,
      });
    }
    res.json({ success: true });
  } catch (err) {
    console.log(err);
    errorResponse(err, res);
  }
});

module.exports = router;
