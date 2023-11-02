const express = require("express");
const router = express.Router();
const likeCtrl = require("../controllers/likeCtrl");

router.post("/like", likeCtrl.likePost);
router.delete("/unlike", likeCtrl.unlikePost);
router.post("/getOne", likeCtrl.getLikes);

module.exports = router;
