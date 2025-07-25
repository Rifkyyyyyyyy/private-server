import { ApiError } from "./apiError-utils.js";

export const catchAsync = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (err) {
      console.error('Async error caught:', err);

      const statusCode = err.statusCode || 500;

      if (err instanceof ApiError) {
        res.status(statusCode).json({
          success: false,
          message: err.message || 'Internal Server Error',
          code: err.code || 'SERVER_ERROR',
          ...err.data,  
        });
      } else {
        res.status(statusCode).json({
          success: false,
          message: err.message || 'Internal Server Error',
          code: err.code || 'SERVER_ERROR',
        });
      }
    }
  };
};
