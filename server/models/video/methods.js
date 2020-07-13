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
};

module.exports = methods;
