const cron = require("node-cron");
const Video = require("../models/video");

const scheduleViewsReset = async () => {
  console.log("Running weekly views reset job");
  const videos = await Video.find({});
  videos.forEach((video) => video.resetWeeklyViews());
};

const scheduleWeeklyViewsReset = () => {
  scheduleViewsReset();
  cron.schedule("0 0 0 * * *", scheduleViewsReset);
};

const runCronJobs = () => {
  scheduleWeeklyViewsReset();
  console.log("Cron jobs done");
};

scheduleViewsReset();
module.exports = {
  scheduleWeeklyViewsReset,
  runCronJobs,
};
