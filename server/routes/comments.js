const express = require("express");
const router = express.Router();
const errorResponse = require("../utils/error");

const Comment = require("../models/comment");
const config = require("../config");

// Get comments of a videos
router.get(
  "/:videoId",
  /*auth, */ async (req, res) => {
    const { userId } = req;
    const { videoId } = req.params;

    try {
      const comments = await Comment.find({ videoId }).populate("commentBy");
      //TODO: clean up results to send & handle video auth
      res.json({ comments });
    } catch (err) {
      res.status(500).json({
        name: "ServerError",
        message: err.message,
      });
    }
  }
);

// Save a comment
router.post(
  "/",
  /*auth, */ async (req, res) => {
    const { userId } = req;
    const { videoId, content, commentBy, commentTo } = req.body;

    try {
      await Comment.create({
        videoId,
        content,
        commentBy,
        commentTo,
      });
      //TODO:  handle video auth
      res.json({ success: true });
    } catch (err) {
      res.status(500).json({
        name: "ServerError",
        message: err.message,
      });
    }
  }
);

module.exports = router;
