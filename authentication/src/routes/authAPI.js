const express = require('express');
let router = express.Router();
const { verifyToken } = require('../middlewares/authMiddleware');
const { loginAPI, refreshTokenAPI, logoutAPI } = require('../controllers/authController');

const initAPIRoutes = (app) => {
    router.post('/login/', loginAPI);
    router.post('/refresh-token/', refreshTokenAPI);
    router.delete('/logout/', verifyToken, logoutAPI);
    return app.use('/api/v1/', router)
}


module.exports = initAPIRoutes;