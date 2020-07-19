const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const WEBSITE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.WEBSITE_URL
    : "http://localhost:3000";

const PORT = process.env.PORT;
const BACKEND_URL =
  process.env.NODE_ENV === "production"
    ? WEBSITE_URL
    : `http://localhost:${PORT}`;

const config = {
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  WEBSITE_URL,
  BACKEND_URL,
  PORT,
  EMAIL: process.env.EMAIL,
  EMAIL_RESET_SECRET: process.env.EMAIL_RESET_SECRET,
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
  NODE_ENV: process.env.NODE_ENV,
  SESSION_DURATION: process.env.SESSION_DURATION,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_DRIVE_CREDENTIALS: JSON.parse(process.env.GOOGLE_DRIVE_CREDENTIALS),
  GOOGLE_DRIVE_TOKEN: JSON.parse(process.env.GOOGLE_DRIVE_TOKEN),
};

module.exports = config;
