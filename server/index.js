const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const path = require("path");
const { auth2 } = require("./middleware/auth");
const { runCronJobs } = require("./services/cronJobs");

//Configurations
const config = require("./config");
const dbConnect = require("./config/db");

// routes
const authRoutes = require("./routes/auth");
const channelRoutes = require("./routes/channels");
const videoRoutes = require("./routes/videos");
const subscriptionRoutes = require("./routes/subscriptions");
const commentRoutes = require("./routes/comments");
const ratingRoutes = require("./routes/ratings");
const passport = require("./config/passport");

//Use Middlewares
app.use(
  cors({
    origin: config.CLIENT_URL,
    credentials: true,
  })
);

app.use((req, res, next) => {
  //Prevents auth leaks when going back in browser
  res.set("Cache-Control", "no-store");
  next();
});
app.use(passport.initialize());
app.use(helmet()); //Secure HTTP headers
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Use Routes
app.use("/api/auth/google", authRoutes);
app.use("/api/channels", auth2, channelRoutes);
app.use("/api/subscriptions", auth2, subscriptionRoutes);
app.use("/api/videos", auth2, videoRoutes);
app.use("/api/comments", auth2, commentRoutes);
app.use("/api/ratings", auth2, ratingRoutes);

//For Deploying client & api on one server
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "../", "client", "build")));
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "../", "client", "build", "index.html")
    );
  });
}

app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
  dbConnect();
  runCronJobs();
});
