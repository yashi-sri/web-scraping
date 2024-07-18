/**
 *  @project - web-scraping
 *  @module - web-scraping-service
 *  @Engineer - Yashi <yashisrivastava030@gmail.com>
 */

// import required libraries
import puppeteer from "puppeteer";

// import models
import ScrapedDataModel from "../models/scrapedData.js";

// import utils
import {
  SUCCESS,
  UNDEFINED,
  ERROR,
  ALREADY_EXISTS,
} from "../utils/constants.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { uploadToS3 } from "../utils/s3.js";

/**
 @desc - read scrape data from given url
 @body {string}- url
 @return {object}- res, data, message, code, success, error
*/
export const getScrapeData = asyncHandler(async (req, res) => {
  let { url } = req.body;

  const existData = await ScrapedDataModel.findOne({ webUrl: url });
  if (existData) {
    return ApiResponse(res, existData, ALREADY_EXISTS, 409, true, UNDEFINED);
  }

  try {
    // Launch Puppeteer and navigate to the URL
    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });

    // Extract data using Puppeteer
    const name = await page.title();
    const description = await page
      .$eval('meta[name="description"]', (el) => el.content)
      .catch(() => "");
    const logo = await page.$eval("img", (el) => el.src).catch(() => "");
    const facebook = await page
      .$eval('a[href*="facebook.com"]', (el) => el.href)
      .catch(() => "");
    const linkedin = await page
      .$eval('a[href*="linkedin.com"]', (el) => el.href)
      .catch(() => "");
    const twitter = await page
      .$eval('a[href*="twitter.com"]', (el) => el.href)
      .catch(() => "");
    const instagram = await page
      .$eval('a[href*="instagram.com"]', (el) => el.href)
      .catch(() => "");
    const address = await page
      .$eval("address", (el) => el.innerText)
      .catch(() => "");
    const phone = await page
      .$eval('a[href^="tel:"]', (el) => el.innerText)
      .catch(() => "");
    const email = await page
      .$eval('a[href^="mailto:"]', (el) => el.innerText)
      .catch(() => "");

    // Take a screenshot using Puppeteer
    const screenshotBuffer = await page.screenshot({ fullPage: true });
    await browser.close();

    // Upload the screenshot to S3
    const bucketName = process.env.AWS_BUCKET_NAME;
    const screenshotKey = `screenshots/${Date.now()}.png`;
    // upload on s3
    const data = await uploadToS3(screenshotBuffer, bucketName, screenshotKey);
    // Save the scraped data to MongoDB
    const scrapedData = await ScrapedDataModel.create({
      name,
      description,
      logoUrl: logo,
      address,
      phone,
      email,
      webUrl: url,
      socialLinks: {
        facebook,
        linkedin,
        twitter,
        instagram,
      },
      screenshotUrl: data?.Location,
    });
    return ApiResponse(res, scrapedData, SUCCESS, 201, true, UNDEFINED);
  } catch (error) {
    return ApiResponse(res, error?.message, ERROR, 500, false, UNDEFINED);
  }
});

/**
 @desc - get all list of scraped data
 @query {number}- page
 @query {number}- limit
 @return {object}- res, data, message, code, success, error
*/
export const getScrapeList = asyncHandler(async (req, res) => {
  let { page, limit } = req.query;

  const list = await ScrapedDataModel.aggregate([
    {
      $facet: {
        data: [
          { $sort: { createdAt: -1 } },
          { $skip: page > 0 ? (page - 1) * limit : 0 },
          { $limit: limit },
          { $project: { updatedAt: 0, createdAt: 0 } },
        ],
        totalCount: [{ $count: "count" }],
      },
    },
    {
      $unwind: {
        path: "$totalCount",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        data: 1,
        totalCount: { $ifNull: ["$totalCount.count", 0] },
        totalPages: { $ceil: { $divide: ["$totalCount.count", limit] } },
      },
    },
  ]);
  const paginatedResult = list[0] || { data: [], totalCount: 0, totalPages: 0 };
  return ApiResponse(res, paginatedResult, SUCCESS, 200, true, UNDEFINED);
});

/**
 @desc - get scraped data by a specific id
 @param {string}- scrapeId
 @return {object}- res, data, message, code, success, error
*/
export const getScrapeDataById = asyncHandler(async (req, res) => {
  let { scrapeId } = req.params;
  const data = await ScrapedDataModel.findById(scrapeId)
    .lean()
    .select("-updatedAt -createdAt");

  return ApiResponse(res, data, SUCCESS, 200, true, UNDEFINED);
});

/**
 @desc - delete scraped data
 @body {array}- scrapeIds
 @return {object}- res, data, message, code, success, error
*/
export const deleteScrapeData = asyncHandler(async (req, res) => {
  const { scrapeIds } = req?.body;
  const data = await ScrapedDataModel.deleteMany({
    _id: { $in: scrapeIds },
  });

  if (data?.deletedCount > 0) {
    return ApiResponse(res, data, SUCCESS, 200, true, UNDEFINED);
  } else return ApiResponse(res, UNDEFINED, ERROR, 400, true, UNDEFINED);
});
