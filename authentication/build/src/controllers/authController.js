const connection = require('../config/authDB');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const {
  checkLogin
} = require('../services/authService');
let loginAPI = async (req, res) => {
  const userLogin = req.body;
  if (userLogin.Username === undefined || userLogin.UserPassword === undefined) {
    return res.status(400).json({
      message: 'Invalid data'
    });
  }
  let confirmUser = await checkLogin(userLogin);
  if (confirmUser) {
    const accessToken = jwt.sign({
      UserID: confirmUser.UserID,
      Username: confirmUser.Username
    }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '30s'
    });
    return res.status(200).json({
      message: 'Login successfully',
      accessToken: accessToken
    });
  } else {
    return res.status(401).json({
      message: 'Login failed'
    });
  }
};
module.exports = {
  loginAPI
};