/**
 *  @project - web-scraping
 *  @module - web-scraping-service
 *  @Engineer - Yashi <yashisrivastava030@gmail.com>
 */

import { ApiResponse } from "./apiResponse.js";
import { ERROR, UNDEFINED } from "./constants.js";

/**
 * Creates an async handler that wraps the request handler in a Promise.
 * If an error occurs, it will be handled based on the error type.
 * @param {Function} requestHandler - The request handler to be wrapped.
 * @returns {Function} The async handler.
 */
const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => {
      let errorMessage = "Internal server error";
      let statusCode = 500;

      if (err.name === "CastError") {
        // Handle invalid ID format
        errorMessage = "Invalid ID format";
        statusCode = 400;
      } else if (err.name === "ValidationError") {
        // Use Mongoose validation error message
        errorMessage = err.message;
        statusCode = 400;
      } else if (err.name === "MongoError" && err.code === 11000) {
        // Unique key constraint violation
        errorMessage = "Duplicate key error";
        statusCode = 400;
      }

      return ApiResponse(
        res,
        UNDEFINED,
        errorMessage,
        statusCode,
        false,
        UNDEFINED
      );

      // next(err);
    });
  };
};

export { asyncHandler };
