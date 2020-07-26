const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const videoSchema = mongoose.Schema(
  {
    uploader: {
      type: Schema.Types.ObjectId,
      ref: "Channel",
      required: [true, "{PATH} is required"],
    },
    title: {
      type: String,
      maxlength: 50,
      required: [true, "{PATH} is required"],
    },
    filename: {
      type: String,
      required: [true, "{PATH} is required"],
    },
    thumbnailFilename: {
      type: String,
      required: [true, "{PATH} is required"],
    },
    description: {
      type: String,
      required: [true, "{PATH} is required"],
    },
    category: {
      type: String,
      enum: [0, 1, 2, 3, 4, 5], //const categories = ["music","sports","gaming","movies & shows","news","live",];
      required: [true, "{PATH} is required"],
    },
    visibility: {
      type: Number,
      enum: [0, 1, 2], // public, unlisted, private
      required: [true, "{PATH} is required"],
    },
    videoStoreId: {
      type: String,
      required: [true, "{PATH} is required"],
    },
    thumbnailStoreId: {
      type: String,
      required: [true, "{PATH} is required"],
    },
    views: {
      type: Number,
      default: 0,
    },
    weeklyViews: {
      type: Number,
      default: 0,
    },
    duration: {
      type: String,
      required: [true, "{PATH} is required"],
    },
  },
  { timestamps: true }
);
require("./methods")(videoSchema);
const Video = mongoose.model("Video", videoSchema);

module.exports = Video;
