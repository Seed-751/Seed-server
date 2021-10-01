module.exports = {
  "env": {
    "node": true,
    "commonjs": true,
    "es2021": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaVersion": 12
  },
  "rules": {
    indent: ["warn", 2, {
      "SwitchCase": 1
    }],
    "no-multiple-empty-lines": [
      "error",
      {
        "max": 1,
        "maxEOF": 0,
        "maxBOF": 0
      }
    ],
    quotes: ["warn", "double"],
    semi: ["warn", "always"],
    curly: ["warn", "all"],
    "no-var": "error",
    "eol-last": ["warn", "always"],
    "arrow-parens": ["warn", "always"],
    "linebreak-style": ["warn", "unix"],
    "no-unused-vars": [
      "warn",
      {
        args: "none",
      }
    ],
    "prefer-const": [
      "warn",
      {
        destructuring: "any",
        ignoreReadBeforeAssign: false,
      }
    ],
  }
};
