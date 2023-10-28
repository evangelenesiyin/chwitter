const Profile = require("../models/profileModel");
const debug = require("debug")("chwitter:controllers:profileCtrl");
const sendResponse = require("../config/sendResponseHelper");

const AWS_S3_OBJECT_URL = process.env.AWS_S3_OBJECT_URL;

async function uploadImg(req, res) {
  try {
    debug("Files received: %o", req.files);
    const { files } = req;
    const imgURLs = files.map((file) => {
      return `${AWS_S3_OBJECT_URL}/${file.processedImage.key}`;
    });
    debug("Images converted to URLs: %o", imgURLs);
    res.status(201).json({
      message: "Image successfully uploaded to S3",
      imageURLs: imgURLs,
    });
  } catch (err) {
    debug("Error uploading images: %o", err);
    sendResponse(res, 500, null, "Error uploading images");
  }
}

async function createProfile(req, res) {
  try {
    debug("req.body: %o", req.body);
    const { displayName, username, bio, location, website } = req.body;
    const profileInfo = { displayName, username, bio, location, website };
    const newProfile = await Profile.create({
      ...profileInfo,
      headerPicture: req.body.headerPicture,
      profilePicture: req.body.profilePicture,
      user: req.user._id,
    });
    sendResponse(res, 201, { profile: newProfile });
  } catch (err) {
    debug("Error creating profile: %o", err);
    if (err.name === "ValidationError") {
      const errors = {};
      debug("Error saving errors: %o", err.errors);
      for (const field in err.errors) {
        errors[field] = err.errors[field].message;
      }
      const errorMessage = Object.keys(errors)[0];
      sendResponse(res, 400, null, errors[errorMessage]);
    } else {
      sendResponse(res, 500, null, "Error creating profile");
    }
  }
}

module.exports = { uploadImg, createProfile };
