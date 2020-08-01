const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = mongoose.Schema(
  {
    commentBy: {
      type: Schema.Types.ObjectId,
      ref: "Channel",
      required: [true, "{PATH} is required"],
    },
    videoId: {
      type: Schema.Types.ObjectId,
      ref: "Video",
      required: [true, "{PATH} is required"],
    },
    content: {
      type: String,
      required: [true, "{PATH} is required"],
    },
    commentTo: {
      type: Schema.Types.ObjectId,
      ref: "Channel",
    },
  },
  { timestamps: true }
);

require("./methods")(commentSchema);
const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
