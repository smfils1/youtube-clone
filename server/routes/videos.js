const express = require("express");
const router = express.Router();
const passport = require("../config/passport");
const errorResponse = require("../utils/error");
const { generateToken } = require("../utils/jwt");
const { WEBSITE_URL } = require("../config/index");
const auth = require("../middleware/auth");

const video = require("../utils/video");
const Video = require("../models/video");

const config = require("../config");

router.post(
  "/",
  /*auth, */ (req, res) => {
    //TODO: Error Handling
    video.upload(req, res, (err) => {
      if (err) {
        return res.json({ success: false, err });
      }
      return res.json({
        success: true,
        filePath: res.req.file.path,
        fileName: res.req.file.filename,
      });
    });
  }
);

module.exports = router;
