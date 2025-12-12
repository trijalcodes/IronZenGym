module.exports = (req, res, next) => {
  if (req.session && req.session.user) {
    // User is authenticated
    next();
  } else {
    // User is not authenticated
    res.status(401).json({ error: 'Unauthorized: Please login first.' });
  }
};