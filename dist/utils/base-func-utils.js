"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatImageToBase64 = void 0;
exports.generateApiKey = generateApiKey;
exports.getPagination = void 0;
var _fs = _interopRequireDefault(require("fs"));
var _crypto = _interopRequireDefault(require("crypto"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function generateApiKey() {
  return _crypto["default"].randomBytes(32).toString('hex');
}
var formatImageToBase64 = exports.formatImageToBase64 = function formatImageToBase64(image) {
  if (!image || !image.tempFilePath || !image.mimetype || !image.name) {
    throw new Error('Invalid image format');
  }
  var base64String = _fs["default"].readFileSync(image.tempFilePath, {
    encoding: 'base64'
  });
  if (!base64String || base64String.length < 50) {
    throw new Error('Image data is empty or too short');
  }
  return {
    name: image.name,
    type: image.mimetype,
    data: "data:".concat(image.mimetype, ";base64,").concat(base64String)
  };
};
var getPagination = exports.getPagination = function getPagination(_ref) {
  var _ref$page = _ref.page,
    page = _ref$page === void 0 ? 1 : _ref$page,
    _ref$limit = _ref.limit,
    limit = _ref$limit === void 0 ? 10 : _ref$limit;
  page = parseInt(page);
  limit = parseInt(limit);
  var skip = (page - 1) * limit;
  return {
    skip: skip,
    limit: limit,
    metadata: {
      page: page,
      limit: limit
    }
  };
};