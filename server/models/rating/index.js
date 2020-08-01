const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ratingSchema = mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "Channel",
    required: [true, "{PATH} is required"],
  },
  rating: {
    type: Number,
    enum: [-1, 1], // dislike & like
    required: [true, "{PATH} is required"],
  },
  ratingType: {
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

require("./methods")(ratingSchema);
const Rating = mongoose.model("Rating", ratingSchema);

module.exports = Rating;
