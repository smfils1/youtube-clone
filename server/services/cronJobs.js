const cron = require("node-cron");
const Video = require("../models/video");

const scheduleWeeklyViewsReset = async () => {
  cron.schedule("0 0 0 * * *", async () => {
    console.log("Running weekly views reset job");
    const videos = await Video.find({});
    videos.forEach((video) => video.resetWeeklyViews());
  });
};

const runCronJobs = () => {
  scheduleWeeklyViewsReset();
  console.log("done");
};

module.exports = {
  scheduleWeeklyViewsReset,
  runCronJobs,
};
