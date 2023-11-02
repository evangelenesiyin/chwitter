const Profile = require("../models/profileModel");
const debug = require("debug")("chwitter:controllers:profileCtrl");
const sendResponse = require("../config/sendResponseHelper");
const User = require("../models/userModel");

const AWS_S3_OBJECT_URL = process.env.AWS_S3_OBJECT_URL;

function uploadImg(req, res) {
  debug("files received: %o", req.files);
  const { files } = req;
  const imgURLs = files.map((file) => {
    return `${AWS_S3_OBJECT_URL}/${file.processedImage.key}`;
  });
  debug("image converted to url:", imgURLs);
  res
    .status(201)
    .json({ message: "Image successfully uploaded to S3", imageURLs: imgURLs });
}

async function createProfile(req, res) {
  const { displayName, username, bio, location, website } = req.body;

  if (displayName === "") {
    return sendResponse(res, 400, null, "Missing or invalid input data");
  }

  try {
    debug("req.body: %o", req.body);
    const profileInfo = { displayName, username, bio, location, website };
    const newProfile = await Profile.create({
      ...profileInfo,
      profilePicture: req.body.profilePicture,
      user: req.user._id,
    });
    const user = await User.findById(req.user._id);
    user.profile = newProfile._id;
    await user.save();
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

async function getOneProfile(req, res) {
  debug("see req.user: %o", req.user);
  try {
    const user = await User.findById(req.user._id).populate("profile").exec();
    debug("found user profile: %o", user.profile);
    sendResponse(res, 200, { user });
  } catch (err) {
    sendResponse(res, 500, null, "Error fetching profile");
  }
}

module.exports = { uploadImg, createProfile, getOneProfile };
