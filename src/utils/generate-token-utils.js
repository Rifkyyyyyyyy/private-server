// generate  token utils


import jwt from 'jsonwebtoken'
import { ApiError } from './apiError-utils.js';


export const generateAccessToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES_IN || "1h",
        issuer: "personal-web-app",
    });
};


export const verifyAccessToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET_KEY, {
            issuer: "personal-web-app",
        });
    } catch (err) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, "Token akses tidak valid atau kedaluwarsa");
    }
};
