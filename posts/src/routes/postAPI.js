const express = require('express');
let router = express.Router();
const { verifyToken } = require('../middlewares/postMiddleware');
const { getUserPosts } = require('../controllers/postController');

const initAPIRoutes = (app) => {
    router.get('/posts', verifyToken, getUserPosts);
    return app.use('/api/v1/', router)
}


module.exports = initAPIRoutes;