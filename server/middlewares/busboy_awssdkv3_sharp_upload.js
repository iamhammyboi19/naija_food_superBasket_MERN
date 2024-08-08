// upload to aws s3 using busboy and aws sdk v3
// reduce image quality by 15% with sharp
const crypto = require("node:crypto");
const { pipeline, PassThrough } = require("node:stream");
const { S3Client } = require("@aws-sdk/client-s3");
const { Upload } = require("@aws-sdk/lib-storage");
const express = require("express");
const sharp = require("sharp");
const app = express();
const busboy = require("busboy");
const CustomError = require("../utils/CustomError");

require("dotenv").config();
const { AWS_S3_ACCESS_SECRET_KEY, AWS_S3_ACCESS_KEY, AWS_S3_BUCKETNAME } =
  process.env;

// create S3Client with your credentials
const client = new S3Client({
  region: "eu-north-1",
  credentials: {
    accessKeyId: AWS_S3_ACCESS_KEY,
    secretAccessKey: AWS_S3_ACCESS_SECRET_KEY,
  },
});

// upload to aws
const uploadStreamToS3 = async (pass, s3client, filename) => {
  //
  // create a new filename 32bytes random hex
  // filename.split(".")[1] gives extension jpg png etc
  const new_file_name =
    "nfsB_images" +
    crypto.randomBytes(32).toString("hex") +
    "." +
    filename.split(".")[1].toLowerCase();

  const upload = new Upload({
    client: s3client,
    params: {
      Bucket: AWS_S3_BUCKETNAME,
      Key: new_file_name,
      Body: pass,
      ACL: "public-read",
    },
  });

  upload.on("httpUploadProgress", () => {});

  return new Promise((resolve, reject) => {
    // resolve with new_file_name when done uploading

    upload
      .done()
      .then((d) => {
        resolve(new_file_name);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// JPEG, PNG, WebP, GIF, AVIF, TIFF and SVG
// sharp supported image formats
const SUPPORTED_FORMAT = [
  "jpeg",
  "png",
  "webp",
  "gif",
  "avif",
  "tiff",
  "svg",
  "jpg",
];

// reduce the image quality with sharp
// might resize later

const reduceImageQuality = () => sharp().jpeg({ quality: 85 });

module.exports = async (req, res, next) => {
  try {
    // fileSize 10mb
    const bb = busboy({
      headers: req.headers,
      limits: { fileSize: 10 * 1024 * 1024 },
    });

    // take the file and pipe it to sharp to resize the image and reduce the quality by 10%
    // pipe from sharp to S3Client body
    // send the file name to next middleware function to save to database
    bb.on("file", async (name, file, info) => {
      const { filename, encoding, mimeType } = info;

      // check if the form field name is nfsB_images else throw an error
      if (name !== "nfsB_images") {
        return next(
          new CustomError(name + " is not a valid form field name", 400)
        );
      }

      // check if mimeType is image
      //   or format JPEG, PNG, WebP, GIF, AVIF, TIFF and SVG
      if (
        !mimeType.startsWith("image") ||
        !SUPPORTED_FORMAT.includes(mimeType.split("/")[1])
      ) {
        return next(new CustomError("File format not supported", 400));
      }

      // check if file reached limit of 10mb
      file.on("limit", () => {
        return next(new CustomError("Image cannot be larger than 10mb", 400));
      });

      // make a PassThrough transform stream and pass(stream) file to s3Client body
      const pass = new PassThrough();

      // convert all images to jpeg with 85% quality
      const sharp_reduction = reduceImageQuality();

      pipeline(file, sharp_reduction, pass, (err) => {
        if (err) {
          // catch is not getting the error
          // fixed sharp error with !SUPPORTED_FORMAT.includes(mimeType.split("/")[1])
          return next(new CustomError("File format not supported", 400));
        }
      });

      // stream to the aws s3Client body and wait till its done
      const new_file_name = await uploadStreamToS3(pass, client, filename, req);

      // if new_file_name pass it to req.file_name
      // else throw an error
      if (new_file_name) {
        req.file_name = new_file_name;
        next();
      } else {
        return next(new CustomError("Error uploading file to our server", 400));
      }
    });

    // get form fields and add it to req.body
    bb.on("field", (name, val) => {
      req.body[name] = val;
    });

    req.pipe(bb);
  } catch (err) {
    return next(err);
  }
};
