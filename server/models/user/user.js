const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "{PATH} is required"],
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: [true, "{PATH} is required"],
  },
  password: {
    type: String,
    minlength: [5, "{PATH} must be >= 5 characters"],
    required: [true, "{PATH} is required"],
  },
});
userSchema.plugin(uniqueValidator, { message: "{PATH} must be unique." });

const saltRounds = 10;
userSchema.pre("save", function (next) {
  const user = this;
  if (user.isModified("password")) {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, (err, hashedPassword) => {
        if (err) return next(err);
        user.password = hashedPassword;
        next();
      });
    });
  } else {
    next();
  }
});

require("./methods")(userSchema);

const User = mongoose.model("User", userSchema);
module.exports = User;
