const { verifyToken } = require("../utils/jwt");
const errorResponse = require("../utils/error");
const config = require("../config");

const auth = (req, res, next) => {
  //Get cookies
  const token = req.cookies.jwt_auth;
  try {
    //Verify token
    const signedUserId = verifyToken({
      token,
      secret: config.JWT_SECRET,
      errorMessage: null,
    });

    //Add User to payload
    req.userId = signedUserId;
    next();
  } catch (err) {
    errorResponse(err, res);
  }
};

module.exports = auth;
