import { prismaClient } from "../application/database.js";
import { StatusCodes } from "http-status-codes";

export const apiKeyMiddleware = async (req, res, next) => {
  try {
    const apiKey = req.headers['x-api-key'];

    if (!apiKey) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: "API Key diperlukan",
      });
    }

    const user = await prismaClient.user.findUnique({
      where: { apiKey },
      select: { id: true, name: true, email: true, role: true },
    });

    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: "API Key tidak valid",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Terjadi kesalahan server",
    });
  }
};
