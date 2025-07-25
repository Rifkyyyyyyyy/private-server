"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _httpStatusCodes = require("http-status-codes");
var _cvServices = _interopRequireDefault(require("../../service/cv/cv-services.js"));
var _catchAsyncUtils = require("../../utils/catch-async-utils.js");
var _apiErrorUtils = require("../../utils/apiError-utils.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
/**
 * @function createCV
 * @description Membuat CV baru dan upload file ke Cloudinary
 */
var createCV = (0, _catchAsyncUtils.catchAsync)(/*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(req, res) {
    var _req$files;
    var _req$body, title, description, category, file, userId, result;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          _req$body = req.body, title = _req$body.title, description = _req$body.description, category = _req$body.category;
          file = (_req$files = req.files) === null || _req$files === void 0 ? void 0 : _req$files.file;
          userId = req.user.id;
          if (file) {
            _context.n = 1;
            break;
          }
          throw new _apiErrorUtils.ApiError(_httpStatusCodes.StatusCodes.BAD_REQUEST, 'File CV wajib diunggah');
        case 1:
          _context.n = 2;
          return _cvServices["default"].createCV({
            userId: userId,
            title: title,
            description: description,
            file: file,
            category: category
          });
        case 2:
          result = _context.v;
          res.status(_httpStatusCodes.StatusCodes.CREATED).json({
            success: true,
            message: 'CV berhasil diunggah',
            data: result
          });
        case 3:
          return _context.a(2);
      }
    }, _callee);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

/**
 * @function getAllCv
 * @description Mengambil semua CV (dengan pagination & filter opsional)
 */
var getAllCv = (0, _catchAsyncUtils.catchAsync)(/*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(req, res) {
    var _req$query, _req$query$page, page, _req$query$limit, limit, userId, result;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          _req$query = req.query, _req$query$page = _req$query.page, page = _req$query$page === void 0 ? 1 : _req$query$page, _req$query$limit = _req$query.limit, limit = _req$query$limit === void 0 ? 5 : _req$query$limit;
          userId = req.user.id;
          _context2.n = 1;
          return _cvServices["default"].getAllCv(parseInt(page), parseInt(limit), userId);
        case 1:
          result = _context2.v;
          res.status(_httpStatusCodes.StatusCodes.OK).json(_objectSpread({
            success: true,
            message: 'Daftar CV berhasil diambil'
          }, result));
        case 2:
          return _context2.a(2);
      }
    }, _callee2);
  }));
  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());

/**
 * @function getCV
 * @description Mengambil satu CV berdasarkan userId & kategori
 */
var getCV = (0, _catchAsyncUtils.catchAsync)(/*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(req, res) {
    var _req$user;
    var userId, category, result;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.n) {
        case 0:
          userId = (_req$user = req.user) === null || _req$user === void 0 ? void 0 : _req$user.id;
          category = req.query.category;
          _context3.n = 1;
          return _cvServices["default"].getCV(userId, category);
        case 1:
          result = _context3.v;
          res.status(_httpStatusCodes.StatusCodes.OK).json({
            success: true,
            message: 'CV berhasil diambil',
            data: result
          });
        case 2:
          return _context3.a(2);
      }
    }, _callee3);
  }));
  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());

/**
 * @function updateCV
 * @description Mengupdate CV berdasarkan ID
 */
var updateCV = (0, _catchAsyncUtils.catchAsync)(/*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(req, res) {
    var _req$files2, _req$user2;
    var _req$body2, title, description, category, file, userId, id, result;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.n) {
        case 0:
          _req$body2 = req.body, title = _req$body2.title, description = _req$body2.description, category = _req$body2.category;
          file = (_req$files2 = req.files) === null || _req$files2 === void 0 ? void 0 : _req$files2.file;
          userId = (_req$user2 = req.user) === null || _req$user2 === void 0 ? void 0 : _req$user2.id;
          id = req.params.id;
          _context4.n = 1;
          return _cvServices["default"].updateCV(id, {
            userId: userId,
            title: title,
            description: description,
            category: category,
            file: file
          });
        case 1:
          result = _context4.v;
          res.status(_httpStatusCodes.StatusCodes.OK).json({
            success: true,
            message: 'CV berhasil diperbarui',
            data: result
          });
        case 2:
          return _context4.a(2);
      }
    }, _callee4);
  }));
  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());

/**
 * @function deleteCV
 * @description Menghapus CV berdasarkan ID
 */
var deleteCV = (0, _catchAsyncUtils.catchAsync)(/*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(req, res) {
    var id;
    return _regenerator().w(function (_context5) {
      while (1) switch (_context5.n) {
        case 0:
          id = req.params.id;
          _context5.n = 1;
          return _cvServices["default"].deleteCV(id);
        case 1:
          res.status(_httpStatusCodes.StatusCodes.OK).json({
            success: true,
            message: 'CV berhasil dihapus'
          });
        case 2:
          return _context5.a(2);
      }
    }, _callee5);
  }));
  return function (_x9, _x0) {
    return _ref5.apply(this, arguments);
  };
}());
var _default = exports["default"] = {
  createCV: createCV,
  getAllCv: getAllCv,
  getCV: getCV,
  updateCV: updateCV,
  deleteCV: deleteCV
};