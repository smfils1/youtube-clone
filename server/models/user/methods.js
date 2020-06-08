const bcrypt = require("bcrypt");

const methods = (userSchema) => {
  userSchema.statics.create = async function (userInfo, error) {
    const User = this;
    const user = new User(userInfo);

    try {
      const createdUser = await user.save();
      return createdUser;
    } catch (err) {
      throw error || err;
    }
  };

  userSchema.statics.findOrCreate = async function (
    { id: oauthId, displayName: name, _json: { email, picture: profileImg } },
    error
  ) {
    const User = this;
    let user;
    try {
      user = await User.findOne({ oauthId });
      if (!user) {
        user = User.create({
          oauthId,
          name,
          email,
          profileImg,
        });
      }
      return user;
    } catch (err) {
      error(err);
    }
  };
};
module.exports = methods;
