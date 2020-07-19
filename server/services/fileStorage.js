const fs = require("fs");
const path = require("path");
const readline = require("readline");
const axios = require("axios");
const { google } = require("googleapis");
const { GOOGLE_DRIVE_CREDENTIALS, GOOGLE_DRIVE_TOKEN } = require("../config");

const SCOPES = ["https://www.googleapis.com/auth/drive"];

// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(__dirname, "../config/token.json");

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(callback) {
  if (GOOGLE_DRIVE_CREDENTIALS.installed) {
    const {
      client_secret,
      client_id,
      redirect_uris,
    } = GOOGLE_DRIVE_CREDENTIALS.installed;
    const oAuth2Client = new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_uris[0]
    );

    // Check if we have previously stored a token.
    // Token should pasted into .env file
    if (!Object.keys(GOOGLE_DRIVE_TOKEN).length)
      return getAccessToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(GOOGLE_DRIVE_TOKEN);
    callback(oAuth2Client);
  }
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });
  console.log("Authorize this app by visiting this url:", authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question("Enter the code from that page here: ", (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error("Error retrieving access token", err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log("Token stored to", TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

//Saves file from google to filesystem
const getFile = (fileId) => {
  const promise = new Promise((resolve, reject) => {
    authorize(async (auth) => {
      const drive = google.drive({ version: "v3", auth });
      try {
        const file = await drive.files.get({
          fileId,
          fields: "*",
        });
        const url = file.data.webContentLink;
        const path = file.data.name;
        const writer = fs.createWriteStream(path);
        const response = await axios({
          url,
          method: "GET",
          responseType: "stream",
        });
        let error = null;
        response.data.pipe(writer);
        writer.on("error", (err) => {
          error = err;
          reject(err);
        });
        writer.on("close", () => {
          if (!error) {
            resolve(true);
          }
        });
      } catch (err) {
        reject(err);
      }
    });
  });
  return promise;
};

//Save file to google
const saveFile = ({ filePath, filename, mimeType }) => {
  const promise = new Promise((resolve, reject) => {
    authorize(async (auth) => {
      const drive = google.drive({ version: "v3", auth });
      try {
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
  });
  return promise;
};

//Gets the public folder created in Google Drive client with the unique name "buckName"
const getBucket = (buckName) => {
  const promise = new Promise((resolve, reject) => {
    authorize(async (auth) => {
      const drive = google.drive({ version: "v3", auth });
      try {
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
  });
  return promise;
};

module.exports = {
  getFile,
  saveFile,
};

// (async () => {
//   try {
//     const a = await getFile("1b8NftTA5wsBrPQ8bkiOCzF8aj7jY3PT3"); //
//     // const a = await saveFile({
//     //   filePath: path.join(
//     //     __dirname,
//     //     "../data/videos/1594482151942_Hang - 30902.mp4"
//     //   ),
//     //   filename: "v1.mp4",
//     //   mimeType: "video/mp4",
//     // });
//     console.log("a", a);
//     console.log(a);
//   } catch (e) {
//     console.log(e);
//   }
// })();
