"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logger = void 0;
var _winston = _interopRequireDefault(require("winston"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var logger = exports.logger = _winston["default"].createLogger({
  level: "info",
  format: _winston["default"].format.json(),
  transports: [new _winston["default"].transports.Console({})]
});