"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.web = void 0;
var _dotenv = _interopRequireDefault(require("dotenv"));
var _express = _interopRequireDefault(require("express"));
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
var _expressFileupload = _interopRequireDefault(require("express-fileupload"));
var _cors = _interopRequireDefault(require("cors"));
var _publicRoutes = _interopRequireDefault(require("../routes/public-routes.js"));
var _privateRoutes = _interopRequireDefault(require("../routes/private-routes.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// ✅ Public dulu // ✅ Api Key setelahnya
// ✅ Private terakhir

_dotenv["default"].config();
var web = exports.web = (0, _express["default"])();
web.use((0, _expressFileupload["default"])());
web.use((0, _cors["default"])({
  credentials: true
}));
web.use((0, _cookieParser["default"])());
web.use(_express["default"].json({
  limit: '50mb'
}));

// Urutan penting:
web.use(_publicRoutes["default"]); // 🟢 Public routes (tanpa token)
web.use(_privateRoutes["default"]); // 🛡️ Private routes (Authorization: Bearer token)