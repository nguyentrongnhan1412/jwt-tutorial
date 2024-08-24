const connection = require('../config/authDB');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const {
  checkLogin,
  updateRefreshToken,
  checkRefreshToken,
  checkLogout
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
      expiresIn: '5m'
    });
    const refreshToken = jwt.sign({
      UserID: confirmUser.UserID,
      Username: confirmUser.Username
    }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: '1h'
    });
    try {
      await updateRefreshToken(confirmUser.UserID, refreshToken);
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: 'Internal server error'
      });
    }
    return res.status(200).json({
      message: 'Login successfully',
      accessToken: accessToken,
      refreshToken: refreshToken
    });
  } else {
    return res.status(401).json({
      message: 'Login failed'
    });
  }
};
let refreshTokenAPI = async (req, res) => {
  const refreshToken = req.body.refreshToken;
  if (refreshToken === undefined) {
    return res.status(400).json({
      message: 'Invalid data'
    });
  }
  let confirmUserRefreshToken = await checkRefreshToken(refreshToken);
  if (confirmUserRefreshToken) {
    try {
      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
      const newaccessToken = jwt.sign({
        UserID: confirmUserRefreshToken.UserID,
        Username: confirmUserRefreshToken.Username
      }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '5m'
      });
      const newrefreshToken = jwt.sign({
        UserID: confirmUserRefreshToken.UserID,
        Username: confirmUserRefreshToken.Username
      }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '1h'
      });
      await updateRefreshToken(confirmUserRefreshToken.UserID, newrefreshToken);
      return res.status(200).json({
        message: 'Refresh token successfully',
        accessToken: newaccessToken,
        refreshToken: newrefreshToken
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: 'Internal server error'
      });
    }
  } else {
    return res.status(401).json({
      message: 'Invalid refresh token'
    });
  }
};
const logoutAPI = async (req, res) => {
  const UserID = req.user.UserID;
  try {
    await updateRefreshToken(UserID, null);
    return res.status(200).json({
      message: 'Logout successfully'
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Internal server error'
    });
  }
};
module.exports = {
  loginAPI,
  refreshTokenAPI,
  logoutAPI
};