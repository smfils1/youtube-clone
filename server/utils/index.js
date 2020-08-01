const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const { generateLink } = require("../services/fileProcess");

const isId = (field) => field instanceof ObjectId;

const extractVideoInfo = (video) => {
  let videoResult = {
    doc: video,
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

  if (video.uploader && !isId(video.uploader)) {
    videoResult = {
      ...videoResult,
      channelName: video.uploader.name || video.uploader[0].name,
      channelId: video.uploader._id || video.uploader[0]._id,
      channelImg: video.uploader.imageLink || video.uploader[0].imageLink,
    };
  }
  return videoResult;
};

const extractCommentInfo = (comment) => {
  let commentResult = {
    id: comment._id,
    content: comment.content,
    createdAt: comment.createdAt,
    videoId: comment.videoId,
    commentTo: comment.commentTo,
  };
  if (comment.commentBy && !isId(comment.commentBy)) {
    commentResult = {
      ...commentResult,
      channelName: comment.commentBy.name,
      channelImg: comment.commentBy.imageLink,
      channelId: comment.commentBy._id,
    };
  }
  return commentResult;
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

module.exports = {
  extractCommentInfo,
  extractVideoInfo,
  extractUploadFilenames,
};
