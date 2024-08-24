const connection = require('../config/postDB');
const getAllUserPosts = async User => {
  let query = 'SELECT * FROM Posts WHERE PostAuthor = ?';
  let [results, fields] = await connection.query(query, [User.UserID]);
  let userPosts = results && results.length > 0 ? results : undefined;
  return userPosts;
};
module.exports = {
  getAllUserPosts
};