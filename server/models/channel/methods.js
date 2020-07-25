const bcrypt = require("bcrypt");

const methods = (channelSchema) => {
  channelSchema.statics.findOrCreate = async function ({
    id: oauthId,
    displayName: name,
    _json: { email, picture: imageLink },
  }) {
    const Channel = this;
    let channel;
    try {
      channel = await Channel.findOne({ oauthId });
      if (!channel) {
        channel = Channel.create({
          oauthId,
          name,
          email,
          imageLink,
        });
      }
      return channel;
    } catch (err) {
      throw err;
    }
  };
};
module.exports = methods;
