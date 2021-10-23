module.exports = {
  root: true,
  env: {
    es6: true,
    node: true
  },
  extends: [
    "eslint:recommended",
    "google"
  ],
  rules: {
    "comma-dangle": ["error", "never"],
    "quotes": ["error", "double"],
    "eol-last": ["error", "never"]
  }
};