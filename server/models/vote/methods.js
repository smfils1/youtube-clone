const mongoose = require("mongoose");

const methods = (voteSchema) => {
  voteSchema.statics.getVotes = async function ({ voteType, voteTypeId }) {
    const Vote = this;
    let results;
    const filter = {
      [voteType + "Id"]: voteTypeId,
    };
    try {
      results = await Vote.aggregate([
        { $match: filter },
        {
          $group: {
            _id: "$vote",
            count: { $sum: 1 },
          },
        },
      ]);
      let votes;
      votes.forEach((voteGroup) => {
        vote[voteGroup._id] = voteGroup.count;
      });
      return votes;
    } catch (err) {
      throw err;
    }
  };

  voteSchema.statics.createVote = async function ({
    userId,
    vote,
    voteType,
    voteTypeId,
  }) {
    const Vote = this;
    try {
      const vote = await Vote.create({
        [voteType + "Id"]: voteTypeId,
        userId,
        vote,
        voteType,
      });
      if (!vote) vote = null;
      return vote;
    } catch (err) {
      throw err;
    }
  };

  voteSchema.statics.updateVoteByUserId = async function ({
    voteType,
    voteTypeId,
    userId,
    vote,
  }) {
    const Vote = this;
    const filter = {
      [voteType + "Id"]: voteTypeId,
      userId,
    };
    const update = { vote };
    try {
      const vote = await Vote.findOneAndUpdate(filter, update);
      if (!vote) vote = null;
      return vote;
    } catch (err) {
      throw err;
    }
  };
};

module.exports = methods;
