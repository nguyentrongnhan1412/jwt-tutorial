const connection = require('../config/postDB');
require('dotenv').config();
const { getAllUserPosts } = require('../services/postService');

let getUserPosts = async (req, res) => {
    let userPosts = await getAllUserPosts(req.user);
    console.log(userPosts);
    if (userPosts) {
        return res.status(200).json({
            message: 'User posts',
            posts: userPosts
        })
    }
    else {
        return res.status(200).json({
            message: 'No posts found'
        })
    }
}

module.exports = { getUserPosts };