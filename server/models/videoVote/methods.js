const methods = (videoVoteSchema) => {
  videoVoteSchema.statics.getVotes = async function (videoId) {
    const VideoVote = this;
    let results;
    const filter = {
      videoId,
    };
    try {
      results = await VideoVote.aggregate([
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

  videoVoteSchema.statics.updateVoteByUserId = async function ({
    videoId,
    userId,
    vote,
  }) {
    const VideoVote = this;
    const filter = {
      videoId,
      userId,
    };
    const update = { vote };
    try {
      const vote = await VideoVote.findOneAndUpdate(filter, update);
      if (!vote) vote = null;
      return vote;
    } catch (err) {
      throw err;
    }
  };
};

module.exports = methods;
