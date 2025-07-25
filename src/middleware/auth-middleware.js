import jwt from 'jsonwebtoken';
import { prismaClient } from '../application/database.js';
import { StatusCodes } from 'http-status-codes';

const JWT_SECRET = process.env.JWT_SECRET_KEY;


export const protect = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      message: 'Token tidak ditemukan. Silakan login.',
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await prismaClient.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, name: true, email: true, role: true },
    });

    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: 'Pengguna tidak ditemukan.',
      });
    }
    
  
    req.user = user;
    next();
  } catch (err) {
    res.clearCookie('token');
    return res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      message: 'Token tidak valid atau sudah kedaluwarsa.',
    });
  }
};

