const mongoose = require("mongoose");
const config = require("./");

//Connect to DB
const dbConnect = () => {
  mongoose
    .connect(config.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => console.log("DB is connected"))
    .catch((err) => console.error(err));
};
module.exports = dbConnect;
