const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const CLIENT_URL =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_CLIENT_URL
    : "http://localhost:3000";

const PORT = process.env.PORT || process.env.REACT_APP_BACKEND_PORT;
const BACKEND_URL =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_BACKEND_URL
    : `http://localhost:${PORT}`;

const config = {
  PORT,
  CLIENT_URL,
  BACKEND_URL,
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  NODE_ENV: process.env.NODE_ENV,
  SESSION_DURATION: process.env.SESSION_DURATION,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_DRIVE_CREDENTIALS: JSON.parse(process.env.GOOGLE_DRIVE_CREDENTIALS),
};

module.exports = config;
