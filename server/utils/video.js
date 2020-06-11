const fs = require("fs");
const multer = require("multer");
const path = require("path");
const ffmpeg = require("fluent-ffmpeg");

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
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".mp4") {
      return cb(res.status(400).end("only jpg, png, mp4 is allowed"), false);
    }
    cb(null, true);
  },
});

const upload = multer({ storage }).single("file");

const generateThumbnails = (videoPath, limit) => {
  let thumbnailPaths;
  const promise = new Promise((resolve, reject) => {
    ffmpeg(videoPath)
      .on("filenames", function (filenames) {
        thumbnailPaths = filenames.map((filename) =>
          path.join(localThumbPath, filename)
        );
      })
      .on("error", (err) => {
        reject(err);
      })
      .on("end", function () {
        resolve(thumbnailPaths);
      })
      .screenshots({
        count: limit,
        folder: localThumbPath,
        size: "1280x720",
        filename: "thumbnail-%b.png",
      });
    return promise;
  });
};

const info = (videoPath) => {
  const promise = new Promise((resolve, reject) => {
    ffmpeg.ffprobe(videoPath, function (err, metadata) {
      if (err) {
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
};
