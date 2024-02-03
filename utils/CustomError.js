module.exports = class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    this.status =
      String(statusCode).startsWith("4") || String(statusCode).startsWith("3")
        ? "error"
        : "fail";
    Error.captureStackTrace(this, this.constructor);
  }
};
