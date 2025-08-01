"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _database = require("../../application/database.js");
var _apiErrorUtils = require("../../utils/apiError-utils.js");
var _httpStatusCodes = require("http-status-codes");
var _validation = require("../../validation/validation.js");
var _educationValidation = require("../../validation/education-validation.js");
var _baseFuncUtils = require("../../utils/base-func-utils.js");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
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
 * @function createEducation
 * @description Membuat data pendidikan baru
 * @param {Object} request - Data input pendidikan
 * @returns {Promise<Object>} Data pendidikan yang dibuat
 */
var createEducation = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(userId, request) {
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          (0, _validation.validate)(_educationValidation.educationValidation, {
            institution: request.institution,
            program: request.program,
            degree: request.degree,
            educationType: request.educationType,
            location: request.location,
            startDate: request.startDate,
            endDate: request.endDate,
            description: request.description
          });
          if (userId) {
            _context.n = 1;
            break;
          }
          throw new _apiErrorUtils.ApiError(_httpStatusCodes.StatusCodes.BAD_REQUEST, 'User ID wajib diisi');
        case 1:
          return _context.a(2, _database.prismaClient.education.create({
            data: {
              userId: userId,
              institution: request.institution,
              program: request.program,
              degree: request.degree,
              educationType: request.educationType,
              location: request.location,
              startDate: new Date(request.startDate),
              endDate: request.endDate ? new Date(request.endDate) : null,
              description: request.description
            }
          }));
      }
    }, _callee);
  }));
  return function createEducation(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * @function updateEducation
 * @description Memperbarui data pendidikan berdasarkan ID
 * @param {string} id - ID pendidikan
 * @param {Object} request - Data yang diperbarui
 * @returns {Promise<Object>} Data pendidikan yang diperbarui
 */
var updateEducation = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(id, request) {
    var filteredRequest, existing;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          filteredRequest = {
            institution: request.institution,
            program: request.program,
            degree: request.degree,
            educationType: request.educationType,
            location: request.location,
            startDate: request.startDate,
            endDate: request.endDate,
            description: request.description
          };
          (0, _validation.validate)(_educationValidation.educationValidation, filteredRequest);
          _context2.n = 1;
          return _database.prismaClient.education.findUnique({
            where: {
              id: id
            }
          });
        case 1:
          existing = _context2.v;
          if (existing) {
            _context2.n = 2;
            break;
          }
          throw new _apiErrorUtils.ApiError(_httpStatusCodes.StatusCodes.NOT_FOUND, 'Education tidak ditemukan');
        case 2:
          return _context2.a(2, _database.prismaClient.education.update({
            where: {
              id: id
            },
            data: _objectSpread(_objectSpread({}, filteredRequest), {}, {
              startDate: new Date(filteredRequest.startDate),
              endDate: filteredRequest.endDate ? new Date(filteredRequest.endDate) : null
            })
          }));
      }
    }, _callee2);
  }));
  return function updateEducation(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * @function getAllEducations
 * @description Mengambil seluruh data pendidikan dengan pagination
 * @param {Object} param
 * @param {number} param.page - Nomor halaman
 * @param {number} param.limit - Jumlah data per halaman
 * @param {string} [param.userId] - Filter berdasarkan userId
 * @returns {Promise<Object>} Data dan metadata pagination
 */
var getAllEducations = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(_ref3) {
    var _ref3$page, page, _ref3$limit, limit, userId, _getPagination, skip, take, metadata, whereClause, _yield$Promise$all, _yield$Promise$all2, data, total;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.n) {
        case 0:
          _ref3$page = _ref3.page, page = _ref3$page === void 0 ? 1 : _ref3$page, _ref3$limit = _ref3.limit, limit = _ref3$limit === void 0 ? 5 : _ref3$limit, userId = _ref3.userId;
          _getPagination = (0, _baseFuncUtils.getPagination)({
            page: page,
            limit: limit
          }), skip = _getPagination.skip, take = _getPagination.limit, metadata = _getPagination.metadata;
          whereClause = userId ? {
            userId: userId
          } : {};
          _context3.n = 1;
          return Promise.all([_database.prismaClient.education.findMany({
            where: whereClause,
            skip: skip,
            take: take,
            orderBy: {
              createdAt: 'desc'
            }
          }), _database.prismaClient.education.count({
            where: whereClause
          })]);
        case 1:
          _yield$Promise$all = _context3.v;
          _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 2);
          data = _yield$Promise$all2[0];
          total = _yield$Promise$all2[1];
          return _context3.a(2, {
            data: data,
            metadata: _objectSpread(_objectSpread({}, metadata), {}, {
              total: total,
              totalPages: Math.ceil(total / metadata.limit)
            })
          });
      }
    }, _callee3);
  }));
  return function getAllEducations(_x5) {
    return _ref4.apply(this, arguments);
  };
}();

/**
 * @function deleteEducation
 * @description Menghapus data pendidikan berdasarkan ID
 * @param {string} id - ID pendidikan
 */
var deleteEducation = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(id) {
    var existing;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.n) {
        case 0:
          _context4.n = 1;
          return _database.prismaClient.education.findUnique({
            where: {
              id: id
            }
          });
        case 1:
          existing = _context4.v;
          if (existing) {
            _context4.n = 2;
            break;
          }
          throw new _apiErrorUtils.ApiError(_httpStatusCodes.StatusCodes.NOT_FOUND, 'Education tidak ditemukan');
        case 2:
          _context4.n = 3;
          return _database.prismaClient.education["delete"]({
            where: {
              id: id
            }
          });
        case 3:
          return _context4.a(2);
      }
    }, _callee4);
  }));
  return function deleteEducation(_x6) {
    return _ref5.apply(this, arguments);
  };
}();

/**
 * @function getEducationByUserId
 * @description Mengambil data pendidikan berdasarkan userId
 * @param {string} userId - ID user
 * @returns {Promise<Array>} Daftar pendidikan
 */
var getEducationByUserId = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(userId) {
    var educations;
    return _regenerator().w(function (_context5) {
      while (1) switch (_context5.n) {
        case 0:
          if (userId) {
            _context5.n = 1;
            break;
          }
          throw new _apiErrorUtils.ApiError(_httpStatusCodes.StatusCodes.BAD_REQUEST, 'User ID harus disertakan');
        case 1:
          _context5.n = 2;
          return _database.prismaClient.education.findMany({
            where: {
              userId: userId
            },
            orderBy: {
              createdAt: 'desc'
            }
          });
        case 2:
          educations = _context5.v;
          return _context5.a(2, educations);
      }
    }, _callee5);
  }));
  return function getEducationByUserId(_x7) {
    return _ref6.apply(this, arguments);
  };
}();
var _default = exports["default"] = {
  createEducation: createEducation,
  updateEducation: updateEducation,
  getAllEducations: getAllEducations,
  deleteEducation: deleteEducation,
  getEducationByUserId: getEducationByUserId
};