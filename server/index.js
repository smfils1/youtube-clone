const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const path = require("path");
const { auth, auth2 } = require("./middleware/auth");
const { runCronJobs } = require("./services/cronJobs");

//Configurations
const config = require("./config");
const dbConnect = require("./config/db");

// routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const videoRoutes = require("./routes/videos");
const subscriptionRoutes = require("./routes/subscriptions");
const passport = require("./config/passport");

//Use Middlewares
app.use(
  cors({
    origin: config.WEBSITE_URL,
    credentials: true,
  })
);
app.use(passport.initialize());
app.use(helmet()); //Secure HTTP headers
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Use Routes
app.use("/api/auth/google", authRoutes);
app.use("/api/users", auth, userRoutes);
app.use("/api/subscriptions", auth, subscriptionRoutes);
app.use("/api/videos", auth2, videoRoutes);

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
