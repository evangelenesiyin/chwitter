const express = require("express");
const router = express.Router();
const chweetCtrl = require("../controllers/chweetCtrl");
const { uploadToS3 } = require("../config/s3Middlewares");

router.post("/", chweetCtrl.createPost);
router.post("/", uploadToS3, chweetCtrl.uploadImg);
router.get("/", chweetCtrl.getAllPosts);

module.exports = router;
