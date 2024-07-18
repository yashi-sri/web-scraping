/**
 *  @project - web-scraping
 *  @module - web-scraping-service
 *  @Engineer - Yashi <yashisrivastava030@gmail.com>
 */

const ApiResponse = (res, data, message, code, success, error) => {
  res.status(code || 200).send({
    message,
    success,
    statusCode: code || 200,
    data,
    error,
  });
};

export { ApiResponse };
