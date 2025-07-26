"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _dotenv = _interopRequireDefault(require("dotenv"));
var _express = _interopRequireDefault(require("express"));
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
var _expressFileupload = _interopRequireDefault(require("express-fileupload"));
var _cors = _interopRequireDefault(require("cors"));
var _publicRoutes = _interopRequireDefault(require("../../dist/routes/public-routes"));
var _serverlessHttp = _interopRequireDefault(require("serverless-http"));
var _privateRoutes = _interopRequireDefault(require("../routes/private-routes"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
_dotenv["default"].config();
var app = (0, _express["default"])();
app.use((0, _expressFileupload["default"])());
app.use((0, _cors["default"])({
  credentials: true
}));
app.use((0, _cookieParser["default"])());
app.use(_express["default"].json({
  limit: '50mb'
}));

// Urutan penting:
app.use(_publicRoutes["default"]);
app.use(_privateRoutes["default"]);
var _default = exports["default"] = (0, _serverlessHttp["default"])(app);