const mongoose = require("mongoose");
const moment = require("moment");

const { extractVideoInfo } = require("../../utils");

const ObjectId = mongoose.Types.ObjectId;

const methods = (videoSchema) => {
  videoSchema.statics.findByName = async function (filename) {
    const Video = this;
    let video;
    try {
      video = await Video.findOne({ filename });
      if (!video)
        throw {
          name: "InvalidResourceError",
          message: "Video not found",
        };
      return video;
    } catch (err) {
      throw err;
    }
  };

  //Partial title search
  videoSchema.statics.findByTitle = async function (title) {
    const Video = this;
    let videoResults = [];
    try {
      const videos = await Video.find({
        title: {
          $regex: title,
          $options: "i",
        },
      }).populate("uploader");
      videos.forEach((video) => {
        video.authorize(
          (isAuth) => {
            if (isAuth) {
              const videoInfo = extractVideoInfo(video);
              videoResults.push(videoInfo);
            } else {
            }
          },
          { onlyPublic: true }
        );
      });
      return videoResults;
    } catch (err) {
      throw err;
    }
  };
  videoSchema.statics.findByThumbnail = async function (thumbnailFilename) {
    const Video = this;
    let video;
    try {
      video = await Video.findOne({ thumbnailFilename });
      if (!video)
        throw {
          name: "InvalidResourceError",
          message: "Video not found",
        };
      return video;
    } catch (err) {
      throw err;
    }
  };

  videoSchema.statics.getRecommended = async function ({ userId, count = 8 }) {
    const Video = this;
    let videos;

    try {
      //if (!userId) throw { message: "userId is required" };
      const filter = {
        uploader: { $ne: ObjectId(userId) },
        visibility: 0,
      };
      videos = await Video.aggregate([
        { $match: filter },
        { $sample: { size: count } }, //get random docs
        {
          $lookup: {
            from: "channels",
            localField: "uploader",
            foreignField: "_id",
            as: "uploader",
          },
        },
      ]);
      const recommended = [];
      videos.forEach((video) => {
        authorize(
          (isAuth) => {
            if (isAuth) {
              const recommendVideo = { ...extractVideoInfo(video) };
              recommended.push(recommendVideo);
            } else {
            }
          },
          {
            onlyPublic: true,
            video: { ...video, uploader: video.uploader._id },
            userId,
          }
        );
      });
      return recommended;
    } catch (err) {
      throw err;
    }
  };

  videoSchema.statics.getTrendingByCategory = async function ({
    limit = 20,
    category,
  }) {
    const Video = this;
    let videos;
    const filter = {
      visibility: 0,
      weeklyViews: { $gte: 0 }, //TODO: change to gt
      category: category || { $gte: 0 },
    };
    const sort = { createdAt: -1 };
    try {
      videos = await Video.find(filter)
        .populate("uploader")
        .sort(sort)
        .limit(limit);

      const videoResults = [];
      videos.forEach((video) => {
        video.authorize(
          (isAuth) => {
            if (isAuth) {
              const videoInfo = extractVideoInfo(video);
              videoResults.push(videoInfo);
            } else {
            }
          },
          { onlyPublic: true }
        );
      });
      return videoResults;
    } catch (err) {
      throw err;
    }
  };

  videoSchema.statics.getChannelVideos = async function ({
    channelId,
    userId,
  }) {
    const Video = this;
    const filter = { uploader: channelId };
    if (userId !== channelId) filter.visibility = 0;
    try {
      const videos = await Video.find(filter).populate("uploader");
      const videoResults = videos.map((video) => extractVideoInfo(video));
      return videoResults;
    } catch (err) {
      throw err;
    }
  };

  videoSchema.statics.getVideo = async function ({ videoId, userId, withDoc }) {
    const Video = this;
    try {
      const video = await Video.findById(videoId).populate("uploader");
      if (!video) {
        throw {
          name: "InvalidResourceError",
          message: "Invalid video",
        };
      }
      return video.authorize(
        (isAuth) => {
          if (isAuth) {
            return extractVideoInfo(video, withDoc);
          } else {
            return {};
          }
        },
        {
          userId,
        }
      );
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
        await this.save();
      } catch (err) {
        console.log(err);
      }
    }
  };

  videoSchema.methods.increaseViews = async function () {
    const video = this;
    try {
      video.weeklyViews = ++video.weeklyViews;
      video.views = ++video.views;
      await this.save();
      return extractVideoInfo(video);
    } catch (err) {
      console.log(err);
    }
  };

  videoSchema.methods.authorize = authorize;
};

const authorize = function (callback, { onlyPublic = false, video, userId }) {
  const { visibility, uploader } = video || this;
  const strictVisibility = onlyPublic ? visibility === 0 : true;
  const normalVisibility =
    visibility < 2 || (visibility === 2 && uploader == userId);
  try {
    return callback(normalVisibility && strictVisibility);
  } catch (err) {
    throw err;
  }
};

module.exports = methods;
