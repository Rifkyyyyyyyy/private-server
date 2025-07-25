export class ApiError extends Error {
    constructor(statusCode, message, options = {}) {
      super(message);
  
      this.statusCode = statusCode;
      this.code = options.code || ApiError.mapStatusToCode(statusCode);
      this.isOperational = options.isOperational !== false;
      this.data = typeof options.data === 'object' ? options.data : {};
  
      if (options.stack) {
        this.stack = options.stack;
      } else {
        Error.captureStackTrace(this, this.constructor);
      }
    }
  
    static mapStatusToCode(status) {
      const map = {
        400: "BAD_REQUEST",
        401: "UNAUTHORIZED",
        403: "FORBIDDEN",
        404: "NOT_FOUND",
        409: "CONFLICT",
        422: "UNPROCESSABLE_ENTITY",
        429: "TOO_MANY_REQUESTS",
        500: "INTERNAL_SERVER_ERROR",
      };
      return map[status] || "ERROR";
    }
  }
  