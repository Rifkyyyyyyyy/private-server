import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import cors from 'cors';

import publicRouters from '../routes/public-routes.js';   // ✅ Public dulu // ✅ Api Key setelahnya
import privateRoutes from '../routes/private-routes.js';  // ✅ Private terakhir

dotenv.config();

export const web = express();

web.use(fileUpload());
web.use(cors({
    credentials: true
}));

web.use(cookieParser());
web.use(express.json({ limit: '50mb' }));

// Urutan penting:
web.use(publicRouters);    // 🟢 Public routes (tanpa token)
web.use(privateRoutes);    // 🛡️ Private routes (Authorization: Bearer token)
