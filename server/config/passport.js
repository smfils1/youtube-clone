const passport = require("passport");
const url = require("url");
const GoogleStrategy = require("passport-google-oauth20");
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = require("./index");
const User = require("../models/user/user");
const { PORT, NODE_ENV, WEBSITE_URL } = require("./index");
//Google Strategy
const BACKEND_URL =
  NODE_ENV === "production" ? WEBSITE_URL : `http://localhost:${PORT}`;
passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: url.resolve(BACKEND_URL, "/api/auth/google/redirect"),
    },
    async (accessToken, refreshToken, profile, done) => {
      //Trigger once user login. We should just save the google id and pass user object to routes (req.user)
      const user = await User.findOrCreate(profile, done);
      return done(null, user);
    }
  )
);

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});

module.exports = passport;
