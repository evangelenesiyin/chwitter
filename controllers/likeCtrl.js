const debug = require("debug")("chwitter:controllers:likeCtrl");
const Like = require("../models/likeModel");
const Chweet = require("../models/chweetModel");
const User = require("../models/userModel");
const sendResponse = require("../config/sendResponseHelper");

async function likePost(req, res) {
  try {
    const { chweet, user } = req.body;
    const findChweet = await Chweet.findById(chweet);
    const findUser = await User.findById(user);

    await Like.create({ chweet: findChweet._id, user: findUser._id });
    findChweet.likes += 1;
    await findChweet.save();
    sendResponse(res, 201, "Chweet liked successfully.");
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, "An error occurred while liking the chweet.");
  }
}

async function unlikePost(req, res) {
  try {
    const { chweet, user } = req.body;

    const findChweet = await Chweet.findById(chweet);
    const findUser = await User.findById(user);

    await Like.findOneAndDelete({
      chweet: findChweet._id,
      user: findUser._id,
    });

    sendResponse(res, 200, "Chweet unliked successfully.");
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, "An error occurred while unliking the chweet.");
  }
}

async function getLikes(req, res) {
  try {
    const { chweet, user } = req.body;
    console.log(req.body);
    const findChweet = await Chweet.findById(chweet);
    const findUser = await User.findById(user);

    const likes = await Like.findOne({
      chweet: findChweet._id,
      user: findUser._id,
    });
    debug("found likes: %o", likes);
    sendResponse(res, 200, { likes });
  } catch (err) {
    debug("Error fetching likes", err);
    sendResponse(res, 500, null, "Error fetching likes");
  }
}

module.exports = { likePost, unlikePost, getLikes };
