const { body } = require("express-validator");
const { ERROR } = require("../constants");

function  validateCreateMusic() {
  return [
    body("title")
      .notEmpty().bail().withMessage(ERROR.emptyTitle),
    body("genre")
      .notEmpty().bail().withMessage(ERROR.emptyGenre),
    body("description")
      .notEmpty().bail().withMessage(ERROR.emptyDescription)
  ];
}

module.exports = validateCreateMusic;
