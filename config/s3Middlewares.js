const AWS = require("aws-sdk");
const multer = require("multer");
const debug = require("debug")("nextfit:config:uploadToS3");
const { v4: uuidv4 } = require("uuid");
const Chweet = require("../models/chweetModel");

const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;
const AWS_REGION = process.env.AWS_REGION;
const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new AWS.S3({
  credentials: {
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
  region: AWS_REGION,
});

debug("s3 object: %o", s3);

const upload = multer({ storage: multer.memoryStorage() }).array("images", 10);

module.exports = {
  uploadToS3: function (req, res, next) {
    const randomIdx = (max) => Math.floor(Math.random() * max);
    const splitUUID = uuidv4().split("-");
    const uniqueID = splitUUID[randomIdx(2)] + "-" + splitUUID[randomIdx(4)];
    debug("generate uuid: %s", uniqueID);

    upload(req, res, async function (err) {
      if (err) {
        return res.status(500).json({ err, message: "Unable to upload" });
      }

      debug("received files in multer: %o", req.files);
      try {
        for (const file of req.files) {
          const params = {
            Bucket: AWS_BUCKET_NAME,
            Key: `${uniqueID}-${file.originalname}`,
            Body: file.buffer,
            ContentType: file.mimetype,
          };

          const uploaded = await s3.upload(params).promise();
          debug("uploaded: %o", uploaded);

          file.processedImage = {
            key: `${uniqueID}-${file.originalname}`,
          };
          debug("file.processedimage", file.processedImage);
        }

        return next();
      } catch (error) {
        console.error(error);
        return res
          .status(500)
          .json({ error, message: "Error processing image" });
      }
    });
  },
  deleteFromS3: async function (req, res, next) {
    const chweetToDelete = await Chweet.findById(req.params.postID);
    debug("chweetToDelete: %o", chweetToDelete);
    const s3ObjectID = chweetToDelete.s3ObjectID;
    debug("s3ObjectID virtual:", s3ObjectID);

    const params = {
      Bucket: AWS_BUCKET_NAME,
      Key: s3ObjectID,
    };

    try {
      await s3.deleteObject(params).promise();
      debug("successfully deleted s3 object");
    } catch (err) {
      console.error(err);
      debug("error deleting from s3: %o", err);
      return res.status(500).json({ err, message: "Error deleting image" });
    }
    return next();
  },
};
