const { validationResult } = require("express-validator");

function checkValidateError(req) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const message = errors.array()[0].msg;

    return message;
  }

  return false;
}

module.exports = checkValidateError;
