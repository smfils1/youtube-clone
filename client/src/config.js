const PORT = process.env.REACT_APP_BACKEND_PORT;
const BACKEND = process.env.REACT_APP_BACKEND_URL;
const BACKEND_URL =
  process.env.NODE_ENV === "production" ? BACKEND : `http://localhost:${PORT}`;

module.exports = { BACKEND_URL };
