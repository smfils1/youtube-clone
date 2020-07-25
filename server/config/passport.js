const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const urljoin = require("url-join");

const Channel = require("../models/channel");
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, BACKEND_URL } = require("./");

//Google Strategy
passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: urljoin(BACKEND_URL, "/api/auth/google/redirect"),
    },
    async (accessToken, refreshToken, profile, done) => {
      //Trigger once user login. We should just save the google id and pass user object to routes (req.user)
      try {
        const user = await Channel.findOrCreate(profile);
        return done(null, user);
      } catch (err) {
        done(err);
      }
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
