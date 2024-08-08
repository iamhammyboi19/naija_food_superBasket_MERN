/*
I CHANGED THIS LOGIC TO USING busboy, sharp, aws sdk v3
check busboy_awssdkv3_sharp_upload.js file
*/

const multer = require("multer");
const multer_S3 = require("multer-s3");
const aws = require("aws-sdk");
// const sharp = require("sharp");
const CustomError = require("../utils/CustomError");

aws.config.update({
  secretAccessKey: process.env.AWS_S3_ACCESS_SECRET_KEY,
  accessKeyId: process.env.AWS_S3_ACCESS_KEY,
  region: "us-east-1",
});

const s3 = new aws.S3();

// USE FOR LOCALSTORAGE
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "../public/src/imgs/");
//   },
//   filename: function (req, file, cb) {
//     cb(
//       null,
//       // whateverthenameis.jpeg or whateverthenameis.png
//       file.fieldname + "_" + Date.now() + `.${file.mimetype.split("/")[1]}`
//     );
//   },
// });

// USING MULTER S3
const storage = multer_S3({
  s3,
  acl: "public-read",
  bucket: process.env.AWS_S3_BUCKETNAME,
  contentType: multer_S3.AUTO_CONTENT_TYPE,
  // key should be the file name
  metadata: function (req, file, cb) {
    // console.log("metadata", file);
    cb(null, { fieldName: file?.fieldname });
  },
  // shouldTransform: function (req, file, cb) {
  //   cb(null, /^image/i.test(file.mimetype));
  // },
  // transforms: [
  //   {
  //     id: "original",
  //     key: (req, file, cb) => {
  //       const rand = String(Math.random()).slice(2);
  //       const fieldname = file.fieldname || "";
  //       const file_name =
  //         fieldname +
  //         "_" +
  //         Date.now() +
  //         rand +
  //         `.${file.mimetype.split("/")[1]}`;
  //       req.file_name = file_name;
  //       cb(
  //         null,
  //         // whateverthenameis.jpeg or whateverthenameis.png
  //         file_name
  //       );
  //     },
  //     transform: async function (req, file, cb) {
  //       // Perform desired transformations
  //       cb(null, await sharp().toFormat("jpeg").jpeg({ quality: 50 }));
  //     },
  //   },
  // ],
  key: (req, file, cb) => {
    const rand = String(Math.random()).slice(2);
    const fieldname = file.fieldname || "";
    const file_name =
      fieldname + "_" + Date.now() + rand + `.${file.mimetype.split("/")[1]}`;
    req.file_name = file_name;
    cb(
      null,
      // whateverthenameis.jpeg or whateverthenameis.png
      file_name
    );
  },
});

function fileFilter(req, file, cb) {
  // console.log("fileFilter", file);
  // if the uploaded type is not an image throw error
  if (!file.mimetype.startsWith("image/")) {
    return cb(
      new CustomError(`You can only upload an image file type`, 400),
      false
    );
  }

  // return true if it is right file type
  cb(null, true);
}

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1024 * 1024 * 10 }, // 10mb
}).single("nfsB_images");

module.exports = (req, res, next) => {
  // console.log("upload", req.file);
  return upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      console.log("multer-err", err);
      return next(err);
    } else if (err instanceof CustomError) {
      // An unknown error occurred when uploading.
      console.log("custom error", err.message);
      return next({ ...err, message: err.message });
    } else if (err) {
      console.log("unknown multer error", err.message);
      return next(err);
    }
    next();
  });
};
