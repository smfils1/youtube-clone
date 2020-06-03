const paginate = (model, auth = false, sort = {}) => async (req, res, next) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const filter = auth ? { user: req.userId } : {};
  const count = await model.countDocuments(filter);

  const results = {};

  if (endIndex < count) {
    results.next = {
      page: page + 1,
      limit: limit,
    };
  }

  if (startIndex > 0) {
    results.previous = {
      page: page - 1,
      limit: limit,
    };
  }
  try {
    results.results = await model
      .find(filter)
      .sort(sort)
      .limit(limit)
      .skip(startIndex);
    results.maxPages = Math.ceil(count / limit) || 1;
    res.paginatedResults = results;
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = paginate;
