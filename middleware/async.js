module.exports = (handler) => {
  return async (req, res, next) => {
    try {
      await handler();
    } catch (err) {
      next(err);
    }
  };
};
