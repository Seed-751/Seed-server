const Music = require("../models/Music");
const createError = require("http-errors");

const checkValidateError = require("../utils/checkValidateError");
const { ERROR } = require("../constants");

exports.getMusics = async function (req, res, next) {
  try {
    const musics = await Music.find().lean();

    res.json({
      success: true,
      data: musics,
    });
  } catch (err) {
    next(err);
  }
};

exports.createMusic = async function (req, res, next) {
  const invalidMessage = checkValidateError(req);

  if (invalidMessage) {
    return next(createError(400, invalidMessage));
  }

  const { id: userId } = req.userInfo;
  const { title, genre, description } = req.body;
  const { image, audioFiles } = req.files;

  try {
    const music = await Music.findOne({ title }).lean();

    if (music) {
      return next(createError(400, ERROR.alreadyTitle));
    }

    const { location: imageLocation } = image[0];
    const audioLocations = audioFiles.map((audio) => {
      return audio.location;
    });

    await Music.create({
      title,
      artist: userId,
      image: imageLocation,
      description,
      genre,
      audios: audioLocations,
    });

    return res.json({ success: true });
  } catch (err) {
    next(err);
  }
};
