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

// Save video
// router.post(
//   "/",
//   /*auth, */ (req, res) => {
//     const {
//       videoPath: filePath,
//       thumbnails,
//       title,
//       description,
//       privacy,
//       category,
//     } = req.body;
//     const selectedThumbPath = thumbnails.selected;
//     const nonSelectedThumbPaths = thumbnails.nonSelected;
//     const { _id: uploader } = req.user;

//     try {
//       video.upload(req, res, (err) => {
//         if (err) {
//           res.status(400).json({
//             name: "UploadError",
//             message: err.message,
//           });
//         } else {
//           res.json({
//             success: true,
//             filePath: res.req.file.path,
//             fileName: res.req.file.filename,
//           });
//         }
//       });
//     } catch (err) {
//       res.status(500).json({
//         name: "ServerError",
//         message: err.message,
//       });
//     }
//   }
// );

// Save video
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
            fileName: res.req.file.filename,
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
      console.log(err);
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
      const file = path.join(__dirname, "..", video.localThumbPath, thumbFile);
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

module.exports = router;
