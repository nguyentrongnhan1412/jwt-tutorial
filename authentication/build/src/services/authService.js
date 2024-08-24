const connection = require('../config/authDB');
const checkLogin = async User => {
  let query = 'SELECT * FROM Users WHERE Username = ? AND UserPassword = ?';
  let [results, fields] = await connection.query(query, [User.Username, User.UserPassword]);
  let confirmUser = results && results.length > 0 ? results[0] : undefined;
  return confirmUser;
};
module.exports = {
  checkLogin
};