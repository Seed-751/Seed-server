const express = require("express");
const router = express.Router();

const musicsController = require("../controllers/musicsController");
const verifyToken = require("../middlewares/verifyToken");
const validateCreateMusic = require("../middlewares/validateMusics");
const validateFile = require("../middlewares/validateFile");
const upload = require("../middlewares/upload");

router.get("/", musicsController.getAllMusics);
router.get("/search", musicsController.searchMusic);
router.get("/:musicId", musicsController.getMusic);
router.get("/myMusics/:userId", verifyToken, musicsController.getMyMusics);
router.get("/myFundings/:userId", verifyToken, musicsController.getMyFundings);
router.post("/payment/:musicId/:userId", verifyToken, musicsController.payment);
router.post("/",
  verifyToken,
  upload.fields([
    { name: "audioFiles" },
    { name: "image" }
  ]),
  validateCreateMusic(),
  validateFile,
  musicsController.createMusic
);

module.exports = router;
