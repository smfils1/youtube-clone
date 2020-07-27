const fs = require("fs");
const path = require("path");
const axios = require("axios");
const { google } = require("googleapis");
const { GOOGLE_DRIVE_CREDENTIALS } = require("../config");

//Saves file from google to filesystem
const getFile = ({ fileId, pathDir }) => {
  const promise = new Promise(async (resolve, reject) => {
    try {
      const drive = await getDrive();
      const file = await drive.files.get({
        fileId: fileId,
        fields: "name",
      });
      const filePath = path.join(pathDir, file.data.name);
      const writer = fs.createWriteStream(filePath);

      const res = await drive.files.get(
        { fileId: fileId, alt: "media", fields: "*" },
        { responseType: "stream" }
      );
      res.data
        .on("end", () => {
          resolve(true);
        })
        .on("error", (err) => {
          reject(err);
        })
        .pipe(writer);
    } catch (err) {
      reject(err);
    }
  });

  return promise;
};

//Delete file from google
const deleteFile = (fileId) => {
  const promise = new Promise(async (resolve, reject) => {
    try {
      const drive = await getDrive();
      await drive.files.delete({
        fileId,
      });
      resolve(true);
    } catch (err) {
      reject(err);
    }
  });
  return promise;
};

//Save file to google
const saveFile = ({ filePath, filename, mimeType }) => {
  const promise = new Promise(async (resolve, reject) => {
    try {
      const drive = await getDrive();

      const bucket = await getBucket("youtube");
      const file = await drive.files.create({
        resource: {
          name: filename,
          parents: [bucket.id],
        },
        media: {
          mimeType,
          body: fs.createReadStream(filePath),
        },
        fields: "id",
      });
      resolve(file.data);
    } catch (err) {
      reject(err);
    }
  });
  return promise;
};

/*
Preconditions: 
  A drive folder named "bucketName" must exist
  Note: I created a folder on Google Drive client and shared it with the service account email
Postconditions:
  Returns the first folder with name "buckName".
*/
const getBucket = (buckName) => {
  const promise = new Promise(async (resolve, reject) => {
    try {
      const drive = await getDrive();
      const folder = await drive.files.list({
        pageSize: 1,
        q: `mimeType='application/vnd.google-apps.folder' and name='${buckName}'`,
        fields: "files(id, name)",
      });
      resolve(folder.data.files[0]);
    } catch (err) {
      reject(err);
    }
  });
  return promise;
};

const getDrive = () => {
  const promise = new Promise(async (resolve, reject) => {
    try {
      const auth = await google.auth.getClient({
        credentials: GOOGLE_DRIVE_CREDENTIALS,
        scopes: "https://www.googleapis.com/auth/drive",
      });
      resolve(
        google.drive({
          version: "v3",
          auth,
        })
      );
    } catch (err) {
      reject(err);
    }
  });
  return promise;
};

module.exports = {
  getFile,
  saveFile,
};
