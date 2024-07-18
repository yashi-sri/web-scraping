/**
 *  @project - web-scraping
 *  @module - web-scraping-service
 *  @Engineer - Yashi <yashisrivastava030@gmail.com>
 */

import { MAX_PAGINATION_LIMIT, UNDEFINED } from "../utils/constants.js";
import { ApiResponse } from "../utils/apiResponse.js";

// Middleware to handle pagination and limits
export const handlePagination = (req, res, next) => {
  const page = parseInt(req?.query?.page) || 0;
  const limit = parseInt(req?.query?.limit) || 10;

  // if page is less than one
  if (page < 1) {
    return ApiResponse(
      res,
      UNDEFINED,
      "Page cannot be Zero or negative",
      403,
      false,
      UNDEFINED
    );
  }

  // Validate and sanitize inputs
  const validPage = Math.max(1, page);
  const validLimit = Math.min(MAX_PAGINATION_LIMIT, Math.max(1, limit)); // Limit to a maximum of 30 items per page

  // Attach pagination parameters to the request object
  req.query = {
    ...req.query,
    page: validPage,
    limit: validLimit,
  };

  next(); // Proceed to the next middleware
};
