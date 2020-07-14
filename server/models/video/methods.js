const mongoose = require("mongoose");
const moment = require("moment");

const ObjectId = mongoose.Types.ObjectId;

const methods = (videoSchema) => {
  videoSchema.statics.findByName = async function ({ filename, error }) {
    const Video = this;
    let video;
    try {
      video = await Video.findOne({ filename });
      if (!video) throw error;
      return video;
    } catch (err) {
      throw err;
    }
  };

  videoSchema.statics.getRecommended = async function (uploader, count = 8) {
    const Video = this;
    let videos;
    const filter = {
      uploader: { $ne: ObjectId(uploader) },
      visibility: 0,
    };
    try {
      videos = await Video.aggregate([
        { $match: filter },
        { $sample: { size: count } },
      ]);
      if (!videos) throw { message: "No videos" };
      return videos;
    } catch (err) {
      throw err;
    }
  };

  videoSchema.statics.getTrending = async function (limit = 20) {
    const Video = this;
    let videos;
    const filter = {
      visibility: 0,
      weeklyViews: { $gt: 0 },
    };
    const sort = { createdAt: -1 };
    try {
      videos = await Video.find(filter).sort(sort).limit(limit);
      if (!videos) throw { message: "No videos" };
      return videos;
    } catch (err) {
      throw err;
    }
  };

  videoSchema.methods.resetWeeklyViews = async function (count = 8) {
    const video = this;
    const { createdAt } = video;
    const diffDays = moment(new Date()).diff(moment(createdAt), "days");
    if (diffDays > 0 && !(diffDays % 7)) {
      try {
        video.weeklyViews = 0;
        this.save();
      } catch (err) {
        console.log(err);
      }
    }
  };
};

module.exports = methods;
