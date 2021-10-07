const express = require("express");
const router = express.Router();

const musicsController = require("../controllers/musicsController");
const verifyToken = require("../middlewares/verifyToken");
const { validateCreateMusic } = require("../middlewares/validateMusics");
const { validateFile } = require("../middlewares/validateFile");
const upload = require("../middlewares/upload");

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