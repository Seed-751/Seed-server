const Music = require("../models/Music");
const createError = require("http-errors");
const axios = require("axios");

const getMetaData = require("../utils/getMetaData");
const checkValidateError = require("../utils/checkValidateError");
const { ERROR } = require("../constants");
const User = require("../models/User");

const { IMP_API_KEY, IMP_SECRET } = process.env;

exports.getAllMusics = async function (req, res, next) {
  try {
    const musics = await Music.find().populate("artist").populate("funding").lean();

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
    const target = 1000000 * audioFiles.length;

    const album = await Music.create({
      title,
      artist: userId,
      image: imageLocation,
      description,
      genre,
      audios: songData,
      funding: { target },
    });

    await User.findByIdAndUpdate(userId, {
      $push: { myAlbums: album._id },
    });

    return res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

exports.getMusic = async function (req, res, next) {
  try {
    const musicId = req.params.musicId;
    const music = await Music.findById(musicId).populate("artist").lean();

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

exports.getMyFundings = async function (req, res, next) {
  const { id: userId } = req.userInfo;

  try {
    const user = await User.findById(userId).populate("myFundings").lean();
    const myFundings = user.myFundings;

    return res.json({
      success: true,
      data: [
        ...myFundings,
      ],
    });
  } catch (err) {
    next(err);
  }
};

exports.getMyMusics = async function (req, res, next) {
  const { id: userId } = req.userInfo;

  try {
    const user = await User.findById(userId).populate("myAlbums").lean();
    const myMusics = user.myAlbums;

    return res.json({
      success: true,
      data: [
        ...myMusics,
      ],
    });
  } catch (err) {
    next(err);
  }
};

exports.payment = async function (req, res, next) {
  const { imp_uid, amountToBePaid, albumId } = req.body;
  const { id: userId } = req.userInfo;

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
      await User.findByIdAndUpdate(userId, {
        $push: { myFundings: albumId },
      });

      await Music.findByIdAndUpdate(albumId, {
        $inc: { ["funding.amount"]: amount },
        $push: { ["funding.donors"]: userId },
      });

      return res.json({
        success: true,
      });
    }

    next(createError(500, ERROR.failPayment));
  } catch (err) {
    next(err);
  }
};
