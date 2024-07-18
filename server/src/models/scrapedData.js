/**
 *  @project - web-scraping
 *  @module - web-scraping-service
 *  @Engineer - Yashi <yashisrivastava030@gmail.com>
 */

import mongoose from "mongoose";

const scrapedDataSchema = new mongoose.Schema(
  {
    name: String,
    socialLinks: {
      facebook: String,
      instagram: String,
      twitter: String,
      linkedin: String,
    },
    address: String,
    description: String,
    phone: String,
    email: String,
    webUrl: String,
    screenshotUrl: String,
    logoUrl: String,
  },
  { timestamps: true, versionKey: false }
);
export default mongoose.model("ScrapedData", scrapedDataSchema);
