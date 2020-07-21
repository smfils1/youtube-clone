const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentVoteSchema = mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "{PATH} is required"],
  },
  commentId: {
    type: Schema.Types.ObjectId,
    ref: "Comment",
    required: [true, "{PATH} is required"],
  },
  vote: {
    type: Number,
    enum: [-1, 1], // dislike & like
    required: [true, "{PATH} is required"],
  },
});

require("./methods")(commentVoteSchema);
const VideoVote = mongoose.model("CommentVote", commentVoteSchema);

module.exports = VideoVote;
