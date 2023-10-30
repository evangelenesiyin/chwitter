const express = require("express");
const router = express.Router();
const profileCtrl = require("../controllers/profileCtrl");
const { uploadToS3 } = require("../config/s3Middlewares");

router.post("/new/upload", uploadToS3, profileCtrl.uploadImg);
router.post("/new", profileCtrl.createProfile);
router.get("/", profileCtrl.getOneProfile);

module.exports = router;
