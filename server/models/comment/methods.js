const mongoose = require("mongoose");
const { extractCommentInfo } = require("../../utils");

const methods = (commentSchema) => {
  commentSchema.statics.getVideoComments = async function (videoId) {
    const Comment = this;
    try {
      const comments = await Comment.find({ videoId })
        .sort({ createdAt: -1 })
        .populate("commentBy");

      const commentResults = comments.map((comment) =>
        extractCommentInfo(comment)
      );
      return commentResults;
    } catch (err) {
      throw err;
    }
  };

  commentSchema.statics.createVideoComments = async function (comment) {
    const Comment = this;
    try {
      const newComment = await Comment.create(comment);
      const newCommentPopulated = await newComment
        .populate("commentBy")
        .execPopulate();
      const commentResult = extractCommentInfo(newCommentPopulated);
      return commentResult;
    } catch (err) {
      throw err;
    }
  };
};

module.exports = methods;
