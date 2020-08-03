const express = require("express");
const fileProcess = require("../services/fileProcess");
const Video = require("../models/video");
const ChannelSubscription = require("../models/channelSubscription");
const { extractVideoInfo } = require("../utils");

const errorResponse = require("../utils/error");

const router = express.Router();

// Save video temporary
router.post("/", (req, res) => {
  try {
    fileProcess.uploadFile(req, res, (err) => {
      if (err) {
        errorResponse(
          {
            name: "UploadError",
            message: err.message,
          },
          res
        );
      } else {
        res.json({
          filename: res.req.file.filename,
        });
      }
    });
  } catch (err) {
    errorResponse(err, res);
  }
});

// Save video
router.post("/upload", async (req, res) => {
  const uploadInfo = req.body;
  try {
    const { filename: videoFilename, thumbnailFilename } = uploadInfo;
    const { id: videoStoreId } = await fileProcess.storeFile({
      filename: videoFilename,
      type: "video",
    });
    const { id: thumbnailStoreId } = await fileProcess.storeFile({
      filename: thumbnailFilename,
      type: "thumbnail",
    });
    const { duration } = await fileProcess.videoInfo(uploadInfo.filename);
    uploadInfo.duration = duration;
    await Video.create({
      videoStoreId,
      thumbnailStoreId,
      ...uploadInfo,
    });
    res.json({
      success: true,
    });
  } catch (err) {
    errorResponse(err, res);
  }
});

//Stream video
router.get("/stream/:videoFile", async (req, res) => {
  const { videoFile } = req.params;
  const { userId } = req;
  try {
    const isExist = await fileProcess.checkFileExists({
      type: "video",
      filename: decodeURIComponent(videoFile),
    });
    const videoDoc = await Video.findByName(decodeURIComponent(videoFile));
    videoDoc.authorize(
      async (isAuth) => {
        let shouldStream = false;
        if (isAuth && isExist) {
          shouldStream = true;
        } else if (isAuth && !isExist) {
          await fileProcess.getStoreFile({
            fileStoreId: videoDoc.videoStoreId,
            type: "video",
          });
          shouldStream = true;
        }
        if (shouldStream) {
          await fileProcess.streamVideo({
            videoFile: decodeURIComponent(videoFile),
            range: req.headers.range,
            res,
          });
        } else {
          errorResponse(
            {
              name: "InaccessibleError",
              message: "Can't not access video",
            },
            res
          );
        }
      },
      { userId }
    );
  } catch (err) {
    errorResponse(
      {
        name: "InvalidResourceError",
        message: "Video not found",
      },
      res
    );
  }
});

// Get recommonded videos (random vids)
router.get("/recommended", async (req, res) => {
  const { userId } = req;
  try {
    const videos = await Video.getRecommended({ userId });
    res.json({
      videos,
    });
  } catch (err) {
    errorResponse(err, res);
  }
});

// Get trending videos
router.get("/trending", async (req, res) => {
  try {
    const videos = await Video.getTrendingByCategory({});
    res.json({
      videos,
    });
  } catch (err) {
    errorResponse(err, res);
  }
});

// Get trending videos in a category
router.get("/trending/:categoryId", async (req, res) => {
  const { categoryId } = req.params;
  try {
    const videos = await Video.getTrendingByCategory({
      category: categoryId,
    });
    res.json({
      videos,
    });
  } catch (err) {
    errorResponse(err, res);
  }
});

// Search for videos
router.get("/search", async (req, res) => {
  const { search_query } = req.query;
  try {
    const videos = await Video.findByTitle(search_query);
    res.json({
      videos,
    });
  } catch (err) {
    errorResponse(err, res);
  }
});

// Get channel videos
router.get("/channel/:channelId", async (req, res) => {
  const { userId } = req;
  const { channelId } = req.params;
  try {
    const videos = await Video.getChannelVideos({
      channelId,
      userId,
    });
    res.json({ videos });
  } catch (err) {
    errorResponse(err, res);
  }
});

// Get subscription videos
router.get("/subscription", async (req, res) => {
  const { userId } = req;
  try {
    if (!userId) throw { message: "userId is required" };
    const channelSubscriptions = await ChannelSubscription.find({
      subscriber: userId,
    });
    const channels = channelSubscriptions.map(({ channel }) => channel);
    const videos = await Video.find({ uploader: { $in: channels } }).populate(
      "uploader"
    );
    const videoResults = videos.map((video) => extractVideoInfo(video));
    res.json({ videos: videoResults });
  } catch (err) {
    errorResponse(err, res);
  }
});

//Generate thumbnails
router.post("/thumbnails", async (req, res) => {
  const { filename } = req.body;
  try {
    const thumbLinks = await fileProcess.generateThumbnails(filename, 3);
    const thumbnails = thumbLinks.map((thumb) => ({
      ...thumb,
      link: thumb.link + "?temporary=true",
    }));
    res.json({ thumbnails });
  } catch (err) {
    errorResponse(err, res);
  }
});

//Get thumbnail
//TODO: test
router.get("/thumbnail/:thumbFile", async (req, res) => {
  const { userId } = req;
  const { thumbFile } = req.params;
  const { temporary } = req.query;
  try {
    const isExist = await fileProcess.checkFileExists({
      type: "thumbnail",
      filename: decodeURIComponent(thumbFile),
    });
    let videoDoc;
    try {
      videoDoc = await Video.findByThumbnail(decodeURIComponent(thumbFile));
    } catch (err) {
      const isTemporary = temporary == "true";
      if (isTemporary) {
        await fileProcess.sendImage({
          filename: decodeURIComponent(thumbFile),
          res,
        });
        return;
      } else {
        throw err;
      }
    }
    videoDoc.authorize(
      async (isAuth) => {
        let shouldSend = false;
        if (isAuth && isExist) {
          shouldSend = true;
        } else if (isAuth && !isExist) {
          await fileProcess.getStoreFile({
            fileStoreId: videoDoc.thumbnailStoreId,
            type: "thumbnail",
          });
          shouldSend = true;
        }
        if (shouldSend) {
          await fileProcess.sendImage({
            filename: decodeURIComponent(thumbFile),
            res,
          });
        } else {
          errorResponse(
            {
              name: "InaccessibleError",
              message: "Can't not access thumbnail",
            },
            res
          );
        }
      },
      { userId }
    );
  } catch (err) {
    errorResponse(err, res);
  }
});

// Get video info
router.get(
  "/:videoId",
  /*auth, */ async (req, res) => {
    const { userId } = req;
    const { videoId } = req.params;
    try {
      const video = await Video.getVideo({ videoId, userId });
      res.json({ video });
    } catch (err) {
      errorResponse(err, res);
    }
  }
);

// Update video info
router.patch(
  "/:videoId",
  /*auth, */ async (req, res) => {
    const { userId } = req;
    const { videoId } = req.params;
    const { updateViews } = req.body;

    try {
      let updatedVideo;

      const video = await Video.getVideo({ videoId, userId, withDoc: true });

      if (video && updateViews === true) {
        updatedVideo = await video.doc.increaseViews();
      }
      res.json({ video: updatedVideo });
    } catch (err) {
      console.log(err);
      errorResponse(err, res);
    }
  }
);

module.exports = router;
