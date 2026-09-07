export const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message || "Internal Server Error";

  if (err.message?.includes("ENOTFOUND") || err.name === "MongoNetworkError" || err.name === "MongooseServerSelectionError") {
    statusCode = 503;
    message = "Database Connection Error: Unable to reach MongoDB cluster. Please check network/DNS connection or start local MongoDB.";
  }

  console.error(`[Error Handler] ${req.method} ${req.originalUrl}:`, err);

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack
  });
};
