const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

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
  profileImg: {
    type: String,
  },
});
userSchema.plugin(uniqueValidator, { message: "{PATH} must be unique." });

require("./methods")(userSchema);

const User = mongoose.model("User", userSchema);
module.exports = User;
