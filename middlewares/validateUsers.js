const { body } = require("express-validator");
const { ERROR } = require("../constants");

function validateSignup() {
  return [
    body("email")
      .notEmpty().bail().withMessage(ERROR.emptyEmail)
      .isEmail().withMessage(ERROR.notValidEmail),
    body("password")
      .notEmpty().bail().withMessage(ERROR.emptyPassword)
      .isLength(8).withMessage(ERROR.notValidPassword),
  ];
}

function validateLogin() {
  return [
    body("email")
      .notEmpty().bail().withMessage(ERROR.emptyEmail)
      .isEmail().withMessage(ERROR.notValidEmail),
    body("password")
      .notEmpty().bail().withMessage(ERROR.emptyPassword)
  ];
}

module.exports = {
  validateSignup,
  validateLogin,
};
