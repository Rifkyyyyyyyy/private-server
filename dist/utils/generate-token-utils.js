"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyAccessToken = exports.generateAccessToken = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _apiErrorUtils = require("./apiError-utils.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// generate  token utils

var generateAccessToken = exports.generateAccessToken = function generateAccessToken(payload) {
  return _jsonwebtoken["default"].sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1h",
    issuer: "personal-web-app"
  });
};
var verifyAccessToken = exports.verifyAccessToken = function verifyAccessToken(token) {
  try {
    return _jsonwebtoken["default"].verify(token, process.env.JWT_SECRET_KEY, {
      issuer: "personal-web-app"
    });
  } catch (err) {
    throw new _apiErrorUtils.ApiError(StatusCodes.UNAUTHORIZED, "Token akses tidak valid atau kedaluwarsa");
  }
};