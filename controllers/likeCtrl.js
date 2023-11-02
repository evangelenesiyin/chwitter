const Like = require("../models/likeModel");
const sendResponse = require("../config/sendResponseHelper");

async function likePost(req, res) {
  try {
    const { chweetID, userID } = req.body;

    const like = new Like({ chweet: chweetID, user: userID });
    await like.save();

    sendResponse(res, 201, "Chweet liked successfully.");
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while liking the chweet" });
  }
}

async function unlikePost(req, res) {
  try {
    const { chweetId, userId } = req.body;

    await Like.findOneAndDelete({ chweet: chweetId, user: userId });

    sendResponse(res, 200, "Chweet unliked successfully.");
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, "An error occurred while unliking the chweet.");
  }
}

module.exports = { likePost, unlikePost };
