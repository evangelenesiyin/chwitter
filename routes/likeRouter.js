const express = require("express");
const router = express.Router();
const likeCtrl = require("../controllers/likeCtrl");

router.post("/like", likeCtrl.likePost);
router.post("/unlike", likeCtrl.unlikePost);

module.exports = router;
