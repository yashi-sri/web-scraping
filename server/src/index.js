/**
 *  @project - web-scraping
 *  @module - web-scraping-service
 *  @Engineer - Yashi <yashisrivastava030@gmail.com>
 */
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import { app } from "./app.js";

dotenv.config();

// connect to database
connectDB()
  .then(async () => {
    const PORT = process.env.PORT;

    // start server
    app.listen(PORT, () => {
      console.log(`⚙️  Server is running at port : ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
  });
