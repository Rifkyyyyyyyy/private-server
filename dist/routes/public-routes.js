"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _expressRateLimit = _interopRequireDefault(require("express-rate-limit"));
var _healthController = _interopRequireDefault(require("../controller/health/health-controller.js"));
var _usersController = _interopRequireDefault(require("../controller/users/users-controller.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// src/routes/public-routes.js

var publicRouters = _express["default"].Router();
var publicLimiter = (0, _expressRateLimit["default"])({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    msg: 'Terlalu banyak permintaan dari IP ini, coba lagi nanti.'
  }
});
publicRouters.use(publicLimiter);
publicRouters.get('/api/ping', _healthController["default"].ping);
publicRouters.post('/api/auth/login', _usersController["default"].loginUser);
publicRouters.post('/api/auth/register', _usersController["default"].registerUser);
var _default = exports["default"] = publicRouters;