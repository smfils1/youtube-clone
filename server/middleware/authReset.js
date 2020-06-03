const { verifyToken } = require("../utils/jwt");
const errorResponse = require("../utils/error");
const config = require("../config");

const authReset = (req, res, next) => {
  //Get token
  const { token } = req.params;
  try {
    //Verify token
    const authUserId = verifyToken({
      token,
      secret: config.EMAIL_RESET_SECRET,
    });

    //Add User to payload
    req.userId = authUserId;
    next();
  } catch (err) {
    errorResponse(err, res);
  }
};

module.exports = authReset;
