const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");

const { ERROR, EXPIRES_IN, MAX_AGE } = require("../constants");
const checkValidateError = require("../utils/checkValidateError");
const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);
const YOUR_SECRET_KEY = process.env.YOUR_SECRET_KEY;

exports.signup = async function (req, res, next) {
  const invalidMessage = checkValidateError(req);

  if (invalidMessage) {
    return next(createError(400, invalidMessage));
  }

  try {
    const { email, password } = req.body;

    const originalMember = await User.findOne({ email }).lean();

    if (originalMember) {
      return next(createError(400, ERROR.alreadyUser));
    }

    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    await User.create({ email, password: hash });

    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

exports.login = async function (req, res, next) {
  const invalidMessage = checkValidateError(req);

  if (invalidMessage) {
    return next(createError(400, invalidMessage));
  }

  const { email, password } = req.body;

  try {
    const originalMember = await User.findOne({ email }).lean();

    if (!originalMember) {
      return next(createError(400, ERROR.notFoundUser));
    }

    const isCorrectPassword = await bcrypt.compare(password, originalMember.password);

    if (!isCorrectPassword) {
      return next(createError(400, ERROR.notFoundPassword));
    }

    const { _id } = originalMember;

    const token = jwt.sign(
      { id: originalMember._id },
      YOUR_SECRET_KEY,
      { expiresIn: EXPIRES_IN }
    );

    res.cookie("token", token, {
      maxAge: MAX_AGE,
    });

    res.json({
      success: true,
      data: {
        _id,
        email,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.authCheck = async function (req, res, next) {
  const { id } = req.userInfo;

  try {
    const { email, _id } = await User.findById(id).lean();

    res.json({
      success: true,
      data: {
        email,
        _id,
      },
    });
  } catch (err) {
    next(err);
  }
};
