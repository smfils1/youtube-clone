const fs = require("fs");
const multer = require("multer");
const path = require("path");
const ffmpeg = require("fluent-ffmpeg");
const urljoin = require("url-join");

const config = require("../config");
const googleStore = require("./fileStorage");
const errorResponse = require("../utils/error");

const localVidPath = path.join(__dirname, "../", "data", "videos");
const localThumbPath = path.join(__dirname, "../", "data", "thumbnails");

const streamVideo = ({ videoFile, range, res }) => {
  try {
    const videoPath = path.join(localVidPath, videoFile);
    const stat = fs.statSync(videoPath);
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
      fs.createReadStream(videoPath, { start, end }).pipe(res);
    } else {
      const head = {
        "Content-Length": fileSize,
        "Content-Type": "video/mp4",
      };
      res.writeHead(200, head);
      fs.createReadStream(videoPath).pipe(res);
    }
  } catch (err) {
    errorResponse(err, res);
  }
};

const sendImage = ({ filename, res }) => {
  const filePath = path.join(localThumbPath, filename);
  res.sendFile(filePath, function (err) {
    if (err) {
      errorResponse(
        {
          name: "FileError",
          message: "File do not exist",
        },
        res
      );
    }
  });
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
const uploadFile = multer({ storage, fileFilter: uploadFilter }).single("file");

const generateThumbnails = (videoFile, limit) => {
  const videoPath = path.join(localVidPath, videoFile);
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

const generateVideoLink = (videoFile) => {
  return urljoin(
    config.BACKEND_URL,
    "/api/videos/stream",
    encodeURIComponent(videoFile)
  );
};
const videoInfo = (filename) => {
  const videoPath = path.join(localVidPath, filename);
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

const storeFile = async ({ filename, type }) => {
  const filePath =
    type === "video"
      ? path.join(localVidPath, filename)
      : path.join(localThumbPath, filename);
  const mimeType = type === "video" ? "video/mp4" : "image/png";

  try {
    console.log(filePath);
    const results = await googleStore.saveFile({
      filePath,
      filename,
      mimeType,
    });
    return results;
  } catch (err) {
    throw err;
  }
};

const getStoreFile = async ({ fileStoreId, type }) => {
  const path = type === "video" ? localVidPath : localThumbPath;
  try {
    const results = await googleStore.getFile({
      fileId: fileStoreId,
      pathDir: path,
    });
    return results;
  } catch (err) {
    throw err;
  }
};
const checkFileExists = async ({ type, filename }) => {
  const file =
    type === "video"
      ? path.join(localVidPath, filename)
      : path.join(localThumbPath, filename);
  try {
    await fs.promises.access(file, fs.constants.F_OK);
    return true;
  } catch (err) {
    return false;
  }
};

module.exports = {
  streamVideo,
  uploadFile,
  generateThumbnails,
  generateVideoLink,
  videoInfo,
  storeFile,
  checkFileExists,
  getStoreFile,
  sendImage,
};
