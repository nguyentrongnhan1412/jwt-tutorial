const express = require('express');
let router = express.Router();
const { loginAPI } = require('../controllers/authController');

const initAPIRoutes = (app) => {
    router.post('/login/', loginAPI);
    return app.use('/api/v1/', router)
}


module.exports = initAPIRoutes;