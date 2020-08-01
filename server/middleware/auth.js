const { verifyToken } = require("../utils/jwt");
const errorResponse = require("../utils/error");
const config = require("../config");

//Responses with error if not auth (strict auth)
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

//Doesn't response w/ error if not auth
const auth2 = (req, res, next) => {
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
    req.userError = err;
    next();
  }
};

module.exports = { auth, auth2 };
