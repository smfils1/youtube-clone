const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const videoVoteSchema = mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "{PATH} is required"],
  },
  videoId: {
    type: Schema.Types.ObjectId,
    ref: "Video",
    required: [true, "{PATH} is required"],
  },
  vote: {
    type: Number,
    enum: [-1, 1], // dislike & like
    required: [true, "{PATH} is required"],
  },
});

require("./methods")(videoVoteSchema);
const VideoVote = mongoose.model("VideoVote", videoVoteSchema);

module.exports = VideoVote;
