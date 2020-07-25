const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const channelSchema = mongoose.Schema({
  oauthId: {
    type: String,
    required: [true, "{PATH} is required"],
  },
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
  imageLink: {
    type: String,
  },
});
channelSchema.plugin(uniqueValidator, { message: "{PATH} must be unique." });

require("./methods")(channelSchema);

const Channel = mongoose.model("Channel", channelSchema);
module.exports = Channel;
