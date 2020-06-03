const errorResponse = (err, res) => {
  if (
    err.name === "CredentialsError" ||
    err.name === "InvalidUserError" ||
    err.name === "InvalidUpdateError"
  ) {
    res.status(400).json({
      name: err.name,
      message: err.message,
    });
  } else if (err.name === "ValidationError") {
    res.status(400).json({
      name: err.name,
      message: formatError(err.message),
    });
  } else if (
    err.name === "JsonWebTokenError" ||
    err.name === "TokenExpiredError"
  ) {
    res.status(401).json({
      name: "CredentialsError",
      message: "Invalid Token",
    });
  } else if (
    err.name === "MailingError" ||
    err.name === "UpdateError" ||
    err.name === "GetError"
  ) {
    res.status(500).json(err);
  } else {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

const formatError = (err) => {
  const errors = {};
  const allErrors = err.substring(err.indexOf(":") + 1).trim();
  const errorArray = allErrors.split(",").map((err) => err.trim());
  errorArray.forEach((error) => {
    const [key, value] = error.split(":").map((err) => err.trim());
    errors[key] = value;
  });
  return errors;
};
module.exports = errorResponse;
