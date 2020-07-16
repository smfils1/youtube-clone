const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const channelSubscriptionSchema = mongoose.Schema({
  channel: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  subscriber: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

require("./methods")(userSchema);

const ChannelSubscriptionSchema = mongoose.model(
  "ChannelSubscription",
  channelSubscriptionSchema
);
module.exports = ChannelSubscriptionSchema;
