const createError = require("http-errors");
const { ERROR } = require("../constants");

function validateFile(req, res, next) {
  const { image, audioFiles } = req.files;

  if (!image) {
    return next(createError(400, ERROR.emptyImage));
  }

  if (!audioFiles.length) {
    return next(createError(400, ERROR.emptyAudioFiles));
  }

  const imageType = image[0].mimetype.split("/")[0];

  if (imageType !== "image") {
    return next(createError(400, ERROR.notValidImage));
  }

  for (let i = 0; i < audioFiles.length; i++) {
    const audioType = audioFiles[i].mimetype.split("/")[0];

    if (audioType !== "audio") {
      return next(createError(400, ERROR.notValidAudio));
    }
  }

  next();
}

module.exports = {
  validateFile,
};
