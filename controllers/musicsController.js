const Music = require("../models/Music");
const createError = require("http-errors");
const axios = require("axios");

const getMetaData = require("../utils/getMetaData");
const checkValidateError = require("../utils/checkValidateError");
const { ERROR } = require("../constants");

const { IMP_API_KEY, IMP_SECRET } = process.env;

exports.getAllMusics = async function (req, res, next) {
  try {
    const musics = await Music.find().populate("artist").lean();

    return res.json({
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
    let songData = [];

    await Promise.all(audioFiles.map((file) => {
      const fileUrl = file.location;
      return getMetaData(fileUrl);
    })).then((result) => {
      songData = [...result];
    }).catch((err) => {
      next(createError(500, ERROR.server));
    });

    const music = await Music.findOne({ title }).lean();

    if (music) {
      return next(createError(400, ERROR.alreadyTitle));
    }

    const { location: imageLocation } = image[0];

    await Music.create({
      title,
      artist: userId,
      image: imageLocation,
      description,
      genre,
      audios: songData,
    });

    return res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

exports.getMusic = async function (req, res, next) {
  try {
    const musicId = req.params.musicId;
    const music = await Music.findById(musicId).lean();

    return res.json({
      success: true,
      data: {
        ...music,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.payment = async function (req, res, next) {
  const { imp_uid, amountToBePaid, albumId } = req.body;

  try {
    const getToken = await axios({
      url: "https://api.iamport.kr/users/getToken",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: {
        imp_key: IMP_API_KEY,
        imp_secret: IMP_SECRET,
      },
    });

    const { access_token } = getToken.data.response;

    const result = await axios({
      url: `https://api.iamport.kr/payments/${imp_uid}`,
      method: "get",
      headers: { "Authorization": access_token },
    });

    const { amount, status } = result.data.response;

    if (amount === amountToBePaid && status === "paid") {
      await Music.findByIdAndUpdate(albumId, { fund: amount});

      return res.json({
        success: true,
      });
    }

    next(createError(500, ERROR.failPayment));
  } catch (err) {
    next(err);
  }
};
