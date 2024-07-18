/**
 *  @project - web-scraping
 *  @module - web-scraping-service
 *  @Engineer - Yashi <yashisrivastava030@gmail.com>
 */

import rateLimit from "express-rate-limit";

// Rate limiting middleware
export const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minutes
  max: 20, // limit each IP to 20 requests per windowMs
  message: {
    message: "Too many requests from this IP, please try again later.",
    statusCode: 429,
    success: false,
  },
});
