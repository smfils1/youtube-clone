const express = require("express");
const router = express.Router();
const passport = require("../config/passport");
const errorResponse = require("../utils/error");
const { generateToken } = require("../utils/jwt");
const { WEBSITE_URL } = require("../config/index");
const auth = require("../middleware/auth");

const video = require("../utils/video");
const Video = require("../models/video");

const fs = require("fs");
const util = require("util");
const path = require("path");
const readFile = util.promisify(fs.readFile);

const config = require("../config");

// Save video temporary
router.post(
  "/",
  /*auth, */ (req, res) => {
    try {
      video.upload(req, res, (err) => {
        if (err) {
          res.status(400).json({
            name: "UploadError",
            message: err.message,
          });
        } else {
          res.json({
            success: true,
            filePath: res.req.file.path,
            filename: res.req.file.filename,
          });
        }
      });
    } catch (err) {
      res.status(500).json({
        name: "ServerError",
        message: err.message,
      });
    }
  }
);

// Save video
router.post(
  "/upload",
  /*auth, */ async (req, res) => {
    const videoInfo = req.body;
    try {
      const { duration } = await video.info(
        path.join("data", "videos", videoInfo.filename)
      );
      videoInfo.duration = duration;
      await Video.create({
        ...videoInfo,
        video: video.generateVideoLink(videoInfo.filename),
        uploader: req.userId || "5edeb0185d791c662f246289",
      });
      res.json({
        success: true,
      });
    } catch (err) {
      res.status(500).json({
        name: "ServerError",
        message: err.message,
      });
    }
  }
);

// Get recommonded videos (random vids)
router.get(
  "/recommended",
  /*auth, */ async (req, res) => {
    req.userId = "5edeb0185d791c662f246280";

    try {
      //Video.
      const videos = await Video.getRecommended(req.userId);
      res.json({
        videos,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        name: "ServerError",
        message: err.message,
      });
    }
  }
);

// Get trending videos
router.get(
  "/trending",
  /*auth, */ async (req, res) => {
    req.userId = "5edeb0185d791c662f246280";

    try {
      //Video.
      const videos = await Video.getTrending();
      res.json({
        videos,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        name: "ServerError",
        message: err.message,
      });
    }
  }
);

//Generate thumbs
router.post(
  "/thumbnails",
  /*auth, */ async (req, res) => {
    const { filename } = req.body;
    console.log(filename);
    try {
      const thumbLinks = await video.generateThumbnails(
        path.join("data", "videos", filename),
        3
      );

      res.json({ thumbnails: thumbLinks });
    } catch (err) {
      res.status(500).json({
        name: "ServerError",
        message: err.message,
      });
    }
  }
);

//Get thumb
router.get(
  "/thumbnail/:thumbFile",
  /*auth, */ async (req, res) => {
    const { thumbFile } = req.params;
    try {
      const file = path.join(
        __dirname,
        "..",
        video.localThumbPath,
        decodeURIComponent(thumbFile)
      );
      res.sendFile(file, function (err) {
        if (err) {
          res.status(err.status).json({
            name: "FileError",
            message: "File do not exist",
          });
        }
      });
    } catch (err) {
      res.status(500).json({
        name: "ServerError",
        message: err.message,
      });
    }
  }
);

//Stream video
router.get("/stream/:videoFile", async (req, res) => {
  const { videoFile } = req.params;
  try {
    const { visibility, uploader } = await Video.findByName({
      filename: decodeURIComponent(videoFile),
      error: { message: "video dont exist" },
    });
    //req.userId = "5edeb0185d791c662f246289";
    if (visibility < 2 || (visibility === 2 && uploader == req.userId)) {
      video.stream(
        path.join("data", "videos", decodeURIComponent(videoFile)),
        req,
        res
      );
    } else {
      res.status(401).json({
        name: "InaccessibleVidError",
        message: "InaccessibleVidError",
      });
    }
  } catch (err) {
    res.status(404).json({
      name: "InaccessibleVidError",
      message: err.message,
    });
  }
});

// Get video info
router.get(
  "/:id",
  /*auth, */ async (req, res) => {
    const { id } = req.params;
    console.log(id);
    //TODO: handle private videos
    try {
      const videoInfo = await Video.findById(id).populate("uploader");

      if (!videoInfo) {
        res.status(400).json({
          name: "VideoError",
          message: "Invalid video",
        });
      }
      const video = {
        id: videoInfo._id,
        views: videoInfo.views,
        createdAt: videoInfo.createdAt,
        thumbnail: videoInfo.thumbnail,
        title: videoInfo.title,
        description: videoInfo.description,
        duration: videoInfo.duration,
        videoLink: videoInfo.video,
        channelImg: videoInfo.uploader.profileImg,
        channel: videoInfo.uploader.name,
        channelId: videoInfo.uploader._id,
      };
      res.json({ video });
    } catch (err) {
      res.status(500).json({
        name: "ServerError",
        message: err.message,
      });
    }
  }
);

module.exports = router;
