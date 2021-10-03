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
      "warn",
      {
        "max": 1,
        "maxEOF": 0,
        "maxBOF": 0
      }
    ],
    quotes: ["warn", "double"],
    semi: ["warn", "always"],
    curly: ["warn", "all"],
    "no-var": "warn",
    "no-unused-vars": ["warn", { "vars": "all", "args": "after-used", "ignoreRestSiblings": false }],
    "eol-last": ["warn", "always"],
    "linebreak-style": ["warn", "unix"],
    "prefer-const": [
      "warn",
      {
        destructuring: "any",
        ignoreReadBeforeAssign: false,
      }
    ],
  }
};
