/**
 *  @project - web-scraping
 *  @module - web-scraping-service
 *  @Engineer - Yashi <yashisrivastava030@gmail.com>
 */

import express from "express";
import cors from "cors";

import { limiter } from "./config/rateLimit.js";

const app = express();

// Apply the rate limiter to all requests
app.use(limiter);
app.use(cors());
app.use(express.json({ limit: "16kb" }));

//routes import
import scrapeRouter from "./routes/scrape.js";

//routes declaration
app.use("/api/v1", scrapeRouter);

export { app };
