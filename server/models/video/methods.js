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
