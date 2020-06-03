const { createProxyMiddleware } = require("http-proxy-middleware");
const { BACKEND_URL } = require("./config");
module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: BACKEND_URL,
      changeOrigin: true,
    })
  );
};
