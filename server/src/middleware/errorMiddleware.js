/**
 * 404 Not Found Handler
 * Catches requests to undefined API routes.
 */
const notFoundHandler = (req, res, next) => {
  const error = new Error(`Resource not found on endpoint: ${req.originalUrl}`);
  res.status(404);
  next(error);
};

/**
 * Central Error Handler
 * Standardizes error responses across all Express routes and controllers.
 */
const errorHandler = (err, req, res, next) => {
  // If status code is 200, default to 500 Internal Server Error
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    error: err.name || 'Error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};

module.exports = {
  notFoundHandler,
  errorHandler
};
