const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const voteSchema = mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    unique: true,
    required: [true, "{PATH} is required"],
  },
  vote: {
    type: Number,
    enum: [-1, 1], // dislike & like
    required: [true, "{PATH} is required"],
  },
  voteType: {
    type: String,
    enum: ["comment", "video"], // dislike & like
    required: [true, "{PATH} is required"],
  },
  commentId: {
    type: Schema.Types.ObjectId,
    ref: "Comment",
  },
  videoId: {
    type: Schema.Types.ObjectId,
    ref: "Video",
  },
});

require("./methods")(voteSchema);
const Vote = mongoose.model("Vote", voteSchema);

module.exports = Vote;
