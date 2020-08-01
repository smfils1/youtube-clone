const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const methods = (ratingSchema) => {
  ratingSchema.statics.getRating = async function ({
    ratingType,
    ratingTypeId,
  }) {
    const Rating = this;
    const filter = {
      [ratingType + "Id"]: ObjectId(ratingTypeId),
    };
    try {
      const results = await Rating.aggregate([
        { $match: filter },
        {
          $group: {
            _id: "$rating",
            count: { $sum: 1 },
          },
        },
      ]);
      let ratings = { likes: 0, dislikes: 0 };
      results.forEach((ratingGroup) => {
        ratings[ratingGroup._id > 0 ? "likes" : "dislikes"] = ratingGroup.count;
      });
      return ratings;
    } catch (err) {
      throw err;
    }
  };

  ratingSchema.statics.getUserRating = async function ({
    userId,
    ratingType,
    ratingTypeId,
  }) {
    const Rating = this;
    const filter = {
      [ratingType + "Id"]: ObjectId(ratingTypeId),
      userId,
    };
    try {
      const rating = await Rating.findOne(filter);
      return rating;
    } catch (err) {
      throw err;
    }
  };
  // ratingSchema.statics.getVideoByCommentId = async function (commentId) {
  //   const Rating = this;
  //   try {
  //     rating = await Rating.findOne({ commentId });

  //     if (!rating) {
  //       throw {
  //         name: "InvalidResourceError",
  //         message: "Invalid video",
  //       };
  //     }
  //     return rating.videoId;
  //   } catch (err) {
  //     console.log(err);
  //     throw err;
  //   }
  // };

  ratingSchema.statics.createRating = async function ({
    userId,
    rating,
    ratingType,
    ratingTypeId,
  }) {
    const Rating = this;
    try {
      const newRating = await Rating.create({
        [ratingType + "Id"]: ratingTypeId,
        userId,
        rating,
        ratingType,
      });
      return newRating;
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
