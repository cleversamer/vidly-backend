module.exports = (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).send("Access denied.");
    }

    next();
  } catch (err) {
    res.status(403).send("Access denied.");
  }
};
