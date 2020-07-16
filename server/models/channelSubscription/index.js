const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const channelSubscriptionSchema = mongoose.Schema({
  channel: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "{PATH} is required"],
  },
  subscriber: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "{PATH} is required"],
  },
});

channelSubscriptionSchema.index(
  { channel: 1, subscriber: 1 },
  { unique: true }
);

require("./methods")(channelSubscriptionSchema);

const ChannelSubscriptionSchema = mongoose.model(
  "ChannelSubscription",
  channelSubscriptionSchema
);
module.exports = ChannelSubscriptionSchema;
