const jwt = require("jsonwebtoken");
const createError = require("http-errors");

const YOUR_SECRET_KEY = process.env.YOUR_SECRET_KEY;
const { ERROR } = require("../constants");

async function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  try {
    if (!token) {
      return next(createError(400, ERROR.notFoundToken));
    }

    const userInfo = await jwt.verify(token, YOUR_SECRET_KEY);
    const { id } = userInfo;

    if (id) {
      req.userInfo = { id };

      return next();
    }

    next(createError(400, ERROR.notAuthorizedUser));
  } catch (err) {
    next(err);
  }
}

module.exports = verifyToken;
