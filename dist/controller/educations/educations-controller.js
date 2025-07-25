"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _httpStatusCodes = require("http-status-codes");
var _catchAsyncUtils = require("../../utils/catch-async-utils.js");
var _educationsService = _interopRequireDefault(require("../../service/educations/educations-service.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
/**
 * @controller createEducation
 * @description Menambah data pendidikan baru untuk pengguna yang login.
 * @route POST /api/educations
 * @access Private
 */
var createEducation = (0, _catchAsyncUtils.catchAsync)(/*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(req, res) {
    var userId, education;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          userId = req.user.id;
          console.log("id : ".concat(userId));
          _context.n = 1;
          return _educationsService["default"].createEducation(userId, req.body);
        case 1:
          education = _context.v;
          res.status(_httpStatusCodes.StatusCodes.CREATED).json({
            success: true,
            msg: 'Data pendidikan berhasil ditambahkan.',
            data: education
          });
        case 2:
          return _context.a(2);
      }
    }, _callee);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

/**
 * @controller updateEducation
 * @description Memperbarui data pendidikan berdasarkan ID.
 * @route PATCH /api/educations/:id
 * @access Private
 */
var updateEducation = (0, _catchAsyncUtils.catchAsync)(/*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(req, res) {
    var education;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          _context2.n = 1;
          return _educationsService["default"].updateEducation(req.params.id, req.body);
        case 1:
          education = _context2.v;
          res.status(_httpStatusCodes.StatusCodes.OK).json({
            success: true,
            msg: 'Data pendidikan berhasil diperbarui.',
            data: education
          });
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
 * @controller deleteEducation
 * @description Menghapus data pendidikan berdasarkan ID.
 * @route DELETE /api/educations/:id
 * @access Private
 */
var deleteEducation = (0, _catchAsyncUtils.catchAsync)(/*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(req, res) {
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.n) {
        case 0:
          _context3.n = 1;
          return _educationsService["default"].deleteEducation(req.params.id);
        case 1:
          res.status(_httpStatusCodes.StatusCodes.OK).json({
            success: true,
            msg: 'Data pendidikan berhasil dihapus.'
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
 * @controller getAllEducations
 * @description Mengambil daftar pendidikan milik pengguna yang login (dengan pagination).
 * @route GET /api/educations
 * @access Private
 */
var getAllEducations = (0, _catchAsyncUtils.catchAsync)(/*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(req, res) {
    var page, limit, userId, _yield$educationsServ, data, metadata;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.n) {
        case 0:
          page = parseInt(req.query.page) || 1;
          limit = parseInt(req.query.limit) || 5;
          userId = req.user.id; // ✅ Ambil ID dari pengguna yang login
          // ✅ Panggil service dengan menyertakan userId untuk filtering
          _context4.n = 1;
          return _educationsService["default"].getAllEducations({
            page: page,
            limit: limit,
            userId: userId
          });
        case 1:
          _yield$educationsServ = _context4.v;
          data = _yield$educationsServ.data;
          metadata = _yield$educationsServ.metadata;
          res.status(_httpStatusCodes.StatusCodes.OK).json({
            success: true,
            msg: 'Daftar pendidikan berhasil diambil.',
            data: data,
            metadata: metadata
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
 * @controller getEducationByUserId
 * @description Mengambil semua data pendidikan milik user tertentu (tanpa pagination).
 * @route GET /api/users/:userId/educations
 * @access Public
 */
var getEducationByUserId = (0, _catchAsyncUtils.catchAsync)(/*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(req, res) {
    var userId, data;
    return _regenerator().w(function (_context5) {
      while (1) switch (_context5.n) {
        case 0:
          userId = req.user.id; // Ambil userId dari parameter URL
          _context5.n = 1;
          return _educationsService["default"].getEducationByUserId(userId);
        case 1:
          data = _context5.v;
          res.status(_httpStatusCodes.StatusCodes.OK).json({
            success: true,
            msg: "Daftar pendidikan untuk pengguna ".concat(userId, " berhasil diambil."),
            data: data
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

// Mengekspor semua fungsi controller
var _default = exports["default"] = {
  createEducation: createEducation,
  updateEducation: updateEducation,
  deleteEducation: deleteEducation,
  getAllEducations: getAllEducations,
  getEducationByUserId: getEducationByUserId // ✅ Menambahkan fungsi baru
};