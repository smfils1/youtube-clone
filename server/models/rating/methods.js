const mongoose = require("mongoose");

const methods = (ratingSchema) => {
  ratingSchema.statics.getRating = async function ({
    ratingType,
    ratingTypeId,
  }) {
    const Rating = this;
    let results;
    const filter = {
      [ratingType + "Id"]: ratingTypeId,
    };
    try {
      results = await Rating.aggregate([
        { $match: filter },
        {
          $group: {
            _id: "$rating",
            count: { $sum: 1 },
          },
        },
      ]);
      let ratings;
      ratings.forEach((ratingGroup) => {
        rating[ratingGroup._id] = ratingGroup.count;
      });
      return ratings;
    } catch (err) {
      throw err;
    }
  };

  ratingSchema.statics.getVideoByCommentId = async function (commentId) {
    const Rating = this;
    let results;
    const filter = {
      commentId,
    };
    try {
      rating = await Rating.findOne({ commentId });
      if (!rating) {
        throw {
          name: "InvalidResourceError",
          message: "Invalid video",
        };
      }
      return rating.videoId;
    } catch (err) {
      throw err;
    }
  };

  ratingSchema.statics.createRating = async function ({
    userId,
    rating,
    ratingType,
    ratingTypeId,
  }) {
    const Rating = this;
    try {
      const rating = await Rating.create({
        [ratingType + "Id"]: ratingTypeId,
        userId,
        rating,
        ratingType,
      });
      if (!rating) rating = null;
      return rating;
    } catch (err) {
      throw err;
    }
  };

  ratingSchema.statics.updateRatingByUserId = async function ({
    ratingType,
    ratingTypeId,
    userId,
    rating,
  }) {
    const Rating = this;
    const filter = {
      [ratingType + "Id"]: ratingTypeId,
      userId,
    };
    const update = { rating };
    try {
      const rating = await Rating.findOneAndUpdate(filter, update);
      if (!rating) {
        throw {
          name: "InvalidResourceError",
          message: "Invalid video",
        };
      }
      return rating;
    } catch (err) {
      throw err;
    }
  };
};

module.exports = methods;
