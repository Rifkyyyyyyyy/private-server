// src/routes/public-routes.js

import express from 'express';
import rateLimit from 'express-rate-limit';

import healthController from '../controller/health/health-controller.js';
import usersController from '../controller/users/users-controller.js';

const publicRouters = express.Router();


const publicLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
        success: false,
        msg: 'Terlalu banyak permintaan dari IP ini, coba lagi nanti.',
    },
});


publicRouters.use(publicLimiter);

publicRouters.get('/api/ping', healthController.ping);
publicRouters.post('/api/auth/login', usersController.loginUser);
publicRouters.post('/api/auth/register', usersController.registerUser);

export default publicRouters;
