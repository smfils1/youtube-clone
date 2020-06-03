const express = require("express");
const url = require("url");
const router = express.Router();

const User = require("../models/user/user");
const errorResponse = require("../utils/error");

const authReset = require("../middleware/authReset");
const { generateToken } = require("../utils/jwt");
const { sendResetPasswordLink } = require("../services/email");
const config = require("../config");

router.post("/login", async (req, res) => {
  const loginInfo = req.body;
  try {
    //Validate credentials
    const user = await User.validate({
      ...loginInfo,
      error: {
        name: "CredentialsError",
        message: "Invalid Login",
      },
    });

    // Generate credential token
    const token = generateToken({
      id: user._id.toHexString(),
      secret: config.JWT_SECRET,
      errorMessage: null,
    });

    //Send credential cookies
    res
      .cookie("jwt_auth", token, {
        maxAge: config.SESSION_DURATION * 60 * 1000,
        httpOnly: true,
        sameSite: true,
        secure: config.NODE_ENV === "production",
      })
      .status(200)
      .json({
        name: user.name,
        email: user.email,
      });
  } catch (err) {
    errorResponse(err, res);
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("jwt_auth").json({ message: "success" });
});

router.post("/register", async (req, res) => {
  const userInfo = req.body;
  try {
    await User.create(userInfo);
    res.status(200).json({ message: "success" });
  } catch (err) {
    errorResponse(err, res);
  }
});

router.post("/forgot", async (req, res) => {
  const loginInfo = req.body;

  try {
    //Check if user exists
    const user = await User.findOne({ email: loginInfo.email });
    if (!user)
      throw {
        name: "InvalidUserError",
        message: "User with this email don't exist",
      };

    //Generate reset token
    const token = generateToken({
      id: user._id.toHexString(),
      secret: config.EMAIL_RESET_SECRET,
      errorMessage: null,
    });

    // Send reset link by email
    const website =
      config.NODE_ENV === "production"
        ? config.WEBSITE_URL
        : "http://localhost:3000";
    await sendResetPasswordLink({
      to: loginInfo.email,
      from: config.EMAIL,
      url: {
        link: url.resolve(website, `/reset/${token}`),
        time: "1 hour",
      },
    });
    res.json({
      message: "success",
    });
  } catch (err) {
    errorResponse(
      {
        name: "MailingError",
        message: "Unable to send email",
      },
      res
    );
  }
});

router.post("/reset/:token", authReset, async (req, res) => {
  const { newPassword } = req.body;
  const { userId } = req;
  try {
    // Update user password
    await User.updatePasswordById({
      id: userId,
      password: newPassword,
    });

    res.json({
      message: "success",
    });
  } catch (err) {
    errorResponse(err, res);
  }
});

module.exports = router;
