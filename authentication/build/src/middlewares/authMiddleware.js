const jwt = require('jsonwebtoken');
const verifyToken = (req, res, next) => {
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({
      message: 'Unauthorized'
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = {
      UserID: decoded.UserID,
      Username: decoded.Username
    };
    next();
  } catch (error) {
    return res.status(403).json({
      message: 'Forbidden'
    });
  }
};
module.exports = {
  verifyToken
};