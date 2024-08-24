const connection = require('../config/authDB');
const checkLogin = async User => {
  let query = 'SELECT * FROM Users WHERE Username = ? AND UserPassword = ?';
  let [results, fields] = await connection.query(query, [User.Username, User.UserPassword]);
  let confirmUser = results && results.length > 0 ? results[0] : undefined;
  return confirmUser;
};
const updateRefreshToken = async (UserID, refreshToken) => {
  let query = 'UPDATE Users SET UserRefreshToken = ? WHERE UserID = ?';
  await connection.execute(query, [refreshToken, UserID]);
};
const checkRefreshToken = async refreshToken => {
  let query = 'SELECT * FROM Users WHERE UserRefreshToken = ?';
  let [results, fields] = await connection.query(query, [refreshToken]);
  let confirmUser = results && results.length > 0 ? results[0] : undefined;
  return confirmUser;
};
const checkLogout = async UserID => {
  let query = 'SELECT * FROM Users WHERE UserID = ?';
  let [results, fields] = await connection.query(query, [UserID]);
  let confirmUser = results && results.length > 0 ? results[0] : undefined;
  return confirmUser;
};
module.exports = {
  checkLogin,
  updateRefreshToken,
  checkRefreshToken,
  checkLogout
};