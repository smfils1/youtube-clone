const express = require("express");
const router = express.Router();
const errorResponse = require("../utils/error");

const Comment = require("../models/comment");
const Video = require("../models/video");

// Get comments of a videos
//TODO: clean up results to send
router.get("/:videoId", async (req, res) => {
  const { userId } = req;
  const { videoId } = req.params;
  let comments;
  try {
    const video = await Video.getVideo({ userId, videoId });
    if (video) {
      comments = await Comment.getVideoComments(videoId);
    }
    res.json({ comments });
  } catch (err) {
    console.log(err);
    errorResponse(err, res);
  }
});

// Save a comment
router.post("/", async (req, res) => {
  const { userId } = req;
  const { videoId, content, commentBy, commentTo } = req.body;
  try {
    let comment;
    const video = await Video.getVideo({ userId, videoId });
    if (video) {
      comment = await Comment.createVideoComments({
        videoId,
        content,
        commentBy,
        commentTo,
      });
    }
    res.json({ comment });
  } catch (err) {
    console.log(err);
    errorResponse(err, res);
  }
});

module.exports = router;
