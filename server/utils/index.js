const { generateLink } = require("../services/fileProcess");
const { isPlainObject } = require("lodash");
const extractVideoInfo = (video) => {
  console.log(video);
  let videoResult = {
    id: video._id,
    views: video.views,
    createdAt: video.createdAt,
    title: video.title,
    description: video.description,
    duration: video.duration,
    videoLink: generateLink({ filename: video.filename, type: "video" }),
    thumbnailLink: generateLink({
      filename: video.thumbnailFilename,
      type: "thumbnail",
    }),
  };
  if (isPlainObject(video.uploader)) {
    videoResult = {
      ...videoResult,
      channelName: video.uploader.name || video.uploader[0].name,
      channelId: video.uploader._id || video.uploader[0]._id,
      channelImg: video.uploader.imageLink || video.uploader[0].imageLink,
    };
  }
  return videoResult;
};

const extractUploadFilenames = (uploadInfo) => {
  //May not need
  const videoFilename = uploadInfo.filename;
  const thumbLink = uploadInfo.thumbnail;
  const thumbSplit = thumbLink.split("/");
  const thumbnailFilename = decodeURIComponent(
    thumbSplit[thumbLink.length - 1]
  );
  return { videoFilename, thumbnailFilename };
};

module.exports = { extractVideoInfo, extractUploadFilenames };
