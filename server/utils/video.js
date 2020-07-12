const fs = require("fs");
const multer = require("multer");
const path = require("path");
const ffmpeg = require("fluent-ffmpeg");
const urljoin = require("url-join");
const config = require("../config");

const localVidPath = path.join("data", "videos");
const localThumbPath = path.join("data", "thumbnails");

const stream = (videPath, range, res) => {
  const stat = fs.statSync(videPath);
  const fileSize = stat.size;
  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunksize = end - start + 1;
    const head = {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunksize,
      "Content-Type": "video/mp4",
    };
    res.writeHead(206, head);
    fs.createReadStream(videPath, { start, end }).pipe(res);
  } else {
    const head = {
      "Content-Length": fileSize,
      "Content-Type": "video/mp4",
    };
    res.writeHead(200, head);
    fs.createReadStream(videPath).pipe(res);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync(localVidPath)) {
      fs.mkdirSync(localVidPath, { recursive: true });
    }
    cb(null, localVidPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const uploadFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname);
  if (ext !== ".mp4") {
    return cb({ message: "Only .mp4 allowed" });
  }
  cb(null, true);
};
const upload = multer({ storage, fileFilter: uploadFilter }).single("file");

const generateThumbnails = (videoPath, limit) => {
  let thumbnailLinks;
  const promise = new Promise((resolve, reject) => {
    ffmpeg(videoPath)
      .on("filenames", function (filenames) {
        thumbnailLinks = filenames.map((filename) => {
          const link = urljoin(
            config.BACKEND_URL,
            "/api/videos/thumbnail",
            encodeURIComponent(filename)
          );
          return link;
        });
      })
      .on("error", (err) => {
        reject(err);
      })
      .on("end", function () {
        resolve(thumbnailLinks);
      })
      .screenshots({
        count: limit,
        folder: localThumbPath,
        size: "1280x720",
        filename: "thumbnail_%b.png",
      });
  });
  return promise;
};

const info = (videoPath) => {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(videoPath, function (err, metadata) {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve({ duration: metadata.format.duration });
      }
    });
  });
};

module.exports = {
  stream,
  upload,
  generateThumbnails,
  info,
  localVidPath,
  localThumbPath,
};
