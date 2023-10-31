const express = require("express");
const router = express.Router();
const chweetCtrl = require("../controllers/chweetCtrl");
const { uploadToS3, deleteFromS3 } = require("../config/s3Middlewares");

router.post("/new/upload", uploadToS3, chweetCtrl.uploadImg);
router.post("/new", chweetCtrl.createPost);
router.get("/", chweetCtrl.getAllPosts);
router.delete("/:postID", deleteFromS3, chweetCtrl.del);
router.patch("/:postID/edit", chweetCtrl.updateOne);

module.exports = router;
