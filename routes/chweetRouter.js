const express = require("express");
const router = express.Router();
const chweetCtrl = require("../controllers/chweetCtrl");
const { uploadToS3 } = require("../config/s3Middlewares");

router.post("/new/upload", uploadToS3, chweetCtrl.uploadImg);
router.post("/new", chweetCtrl.createPost);
router.get("/", chweetCtrl.getAllPosts);

module.exports = router;
