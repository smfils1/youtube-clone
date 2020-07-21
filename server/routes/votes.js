const express = require("express");
const router = express.Router();
const errorResponse = require("../utils/error");

const Vote = require("../models/vote");

// voteType = comment OR video

// Get likes & dislike of voteType
router.get(
  "/:voteType/:voteTypeId",
  /*auth, */ async (req, res) => {
    const { userId } = req;
    const { voteType, voteTypeId } = req.params;

    try {
      const votes = await Vote.getVotes({ voteType, voteTypeId });
      //TODO: auth video
      res.json({ votes });
    } catch (err) {
      res.status(500).json({
        name: "ServerError",
        message: err.message,
      });
    }
  }
);

// Likes & dislike a voteType
router.post(
  "/:voteType/:voteTypeId",
  /*auth, */ async (req, res) => {
    const { userId } = req;
    const { voteType, voteTypeId } = req.params;
    const { vote } = req.body;

    try {
      const newVote = await VideoVote.createVote({
        userId,
        vote,
        voteType,
        voteTypeId,
      });
      res.json({ vote: newVote });
    } catch (err) {
      res.status(500).json({
        name: "ServerError",
        message: err.message,
      });
    }
  }
);

// Update likes & dislike on voteType
router.patch(
  "/:voteType/:voteTypeId",
  /*auth, */ async (req, res) => {
    const { userId } = req;
    const { voteType, voteTypeId } = req.params;
    const { vote } = req.body;

    try {
      const updatedVote = await VideoVote.updateVoteByUserId({
        voteType,
        voteTypeId,
        userId,
        vote,
      });
      res.json({ vote: updatedVote });
    } catch (err) {
      res.status(500).json({
        name: "ServerError",
        message: err.message,
      });
    }
  }
);

module.exports = router;
