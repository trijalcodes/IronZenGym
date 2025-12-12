exports.requireLogin = (req, res, next) => {
  console.log("Session data:",req.session);
  if (req.session && req.session.user) {
    return next();
  } else {
    return
    res.status(401).json({ error: 'Unauthorized' });
  }
  };