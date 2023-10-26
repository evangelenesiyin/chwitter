const Chweet = require("../models/chweetModel");
const debug = require("debug")("chwitter:controllers:chweetCtrl");
const sendResponse = require("../config/sendResponseHelper");

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

async function createPost(req, res) {
  debug("req.body: %o", req.body);
  const { postText } = req.body;
  const postInfo = { postText };
  try {
    const newPost = await Chweet.create({
      ...postInfo,
      imageURL: req.body.images,
      user: req.user._id,
    });
    sendResponse(res, 201, {
      post: newPost,
    });
  } catch (err) {
    debug("Error saving: %o", err);
    if (err.name === "ValidationError") {
      const errors = {};
      debug("Error saving errors:", err.errors);
      for (const field in err.errors) {
        errors[field] = err.errors[field].message;
      }
      const errorMessage = Object.keys(errors)[0];
      return sendResponse(res, 400, null, errors[errorMessage]);
    }
    sendResponse(res, 500, null, "Error creating post");
  }
}

async function getAllPosts(req, res) {
  debug("see req.user: %o", req.user);
  try {
    const post = await Chweet.find({ user: req.user._id });
    debug("found posts by user: %o", post);
    sendResponse(res, 200, { post });
  } catch (err) {
    sendResponse(res, 500, null, "Error fetching all posts");
  }
}

module.exports = { uploadImg, createPost, getAllPosts };