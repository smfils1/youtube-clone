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
        {
          $lookup: {
            from: "users",
            localField: "uploader",
            foreignField: "_id",
            as: "uploader",
          },
        },
      ]);
      if (!videos) throw { message: "No videos" };
      const recommended = videos.map(
        ({
          _id,
          views,
          createdAt,
          thumbnail,
          title,
          description,
          duration,
          video,
          uploader,
        }) => ({
          id: _id,
          views,
          createdAt,
          thumbnail,
          title,
          description,
          duration,
          video,
          channel: uploader[0].name,
          channelId: uploader[0]._id,
          channelImg: uploader[0].profileImg,
        })
      );
      return recommended;
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
      videos = await Video.find(filter)
        .populate("uploader")
        .sort(sort)
        .limit(limit);
      if (!videos) throw { message: "No videos" };
      const trending = videos.map(
        ({
          _id,
          createdAt,
          views,
          thumbnail,
          title,
          description,
          duration,
          video,
          uploader,
        }) => ({
          id: _id,
          views,
          createdAt,
          thumbnail,
          title,
          description,
          duration,
          video,
          channelImg: uploader.profileImg,
          channel: uploader.name,
          channelId: uploader._id,
        })
      );
      return trending;
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
