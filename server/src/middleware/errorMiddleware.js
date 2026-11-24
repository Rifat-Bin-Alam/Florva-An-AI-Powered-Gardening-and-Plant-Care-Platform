/**
 * 404 Route Not Found Handler
 */
const notFoundHandler = (req, res, next) => {
  const error = new Error(`Resource Not Found — ${req.originalUrl}`);
  res.status(404);
  next(error);
};

/**
 * Central Error Handler
 * Formats errors consistently, handles MongoDB validation & duplicate key errors, and Multer file upload errors.
 */
const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message || 'Internal Server Error';

  // Handle Multer / File Upload Errors (e.g. invalid format, file too large)
  if (err.name === 'MulterError') {
    statusCode = 400;
    if (err.code === 'LIMIT_FILE_SIZE') {
      message = 'Original upload file is too large. Maximum allowed upload file size is 5 MB. Accepted images are resized to 100x100 px and compressed under 100 KB.';
    } else {
      message = `File upload error: ${err.message}`;
    }
  } else if (err.message && (err.message.includes('Invalid file format') || err.message.includes('Unsupported image format') || err.message.includes('Corrupted or invalid image'))) {
    statusCode = 400;
  }

  // Handle Mongoose Duplicate Key Error (e.g. duplicate email)
  if (err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyValue)[0];
    message = `An account with that ${field} already exists`;
  }

  // Handle Mongoose Validation Error
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors).map(val => val.message).join(', ');
  }

  // Handle Mongoose CastError (invalid ObjectId)
  if (err.name === 'CastError') {
    statusCode = 404;
    message = 'Resource not found';
  }

  res.status(statusCode).json({
    success: false,
    error: message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};

module.exports = {
  notFoundHandler,
  errorHandler
};
