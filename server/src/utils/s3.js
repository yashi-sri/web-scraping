import { PassThrough } from "stream";
import AWS from "../config/aws.js";

const s3 = new AWS.S3();

const uploadToS3 = (buffer, bucketName, key) => {
  const pass = new PassThrough();
  pass.end(buffer);

  const params = {
    Bucket: bucketName,
    Key: key,
    Body: pass,
    ACL: "public-read", // Change to appropriate ACL if needed
    ContentType: "image/png", // or whatever content type you want to set
  };

  return s3.upload(params).promise();
};

export { uploadToS3 };
