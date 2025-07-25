"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _database = require("../../application/database.js");
var _cloudinaryServices = _interopRequireDefault(require("../cloudinary/cloudinary-services.js"));
var _apiErrorUtils = require("../../utils/apiError-utils.js");
var _httpStatusCodes = require("http-status-codes");
var _validation = require("../../validation/validation.js");
var _cvValidation = require("../../validation/cv-validation.js");
var _baseFuncUtils = require("../../utils/base-func-utils.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
/**
 * Fungsi bantu hapus ekstensi file (misal .pdf)
 */
var removeFileExtension = function removeFileExtension(filename) {
  return filename.replace(/\.[^/.]+$/, '');
};
var createCV = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(request) {
    var userId, title, description, file, category, originalName, safeNameWithoutExt, safeFileName, uploadedFile, fileJson, existing, _t, _t2;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          userId = request.userId, title = request.title, description = request.description, file = request.file, category = request.category;
          if (file) {
            _context.n = 1;
            break;
          }
          throw new _apiErrorUtils.ApiError(_httpStatusCodes.StatusCodes.BAD_REQUEST, 'File wajib diunggah');
        case 1:
          // Hapus ekstensi dari nama file untuk publicId Cloudinary
          originalName = file.name.trim().replace(/\s+/g, '-');
          safeNameWithoutExt = removeFileExtension(originalName);
          safeFileName = "cv-".concat(safeNameWithoutExt);
          _context.p = 2;
          _context.n = 3;
          return _cloudinaryServices["default"].uploadToCloudinary('cvs', file, safeFileName, 'raw');
        case 3:
          uploadedFile = _context.v;
          _context.n = 5;
          break;
        case 4:
          _context.p = 4;
          _t = _context.v;
          throw new _apiErrorUtils.ApiError(_httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR, 'Gagal mengunggah file ke Cloudinary');
        case 5:
          fileJson = {
            publicId: uploadedFile.publicId,
            fileUrl: uploadedFile.fileUrlAttachment // URL dengan flag attachment
          };
          _context.p = 6;
          (0, _validation.validate)(_cvValidation.cvsValidation, {
            title: title,
            description: description,
            category: category,
            fileJson: fileJson
          });
          _context.n = 7;
          return _database.prismaClient.cV.findFirst({
            where: {
              userId: userId,
              category: category
            }
          });
        case 7:
          existing = _context.v;
          if (!existing) {
            _context.n = 9;
            break;
          }
          _context.n = 8;
          return _cloudinaryServices["default"].deleteFromCloudinary(fileJson.publicId, 'raw');
        case 8:
          throw new _apiErrorUtils.ApiError(_httpStatusCodes.StatusCodes.BAD_REQUEST, 'CV dengan kategori ini sudah ada');
        case 9:
          _context.n = 10;
          return _database.prismaClient.cV.create({
            data: {
              userId: userId,
              title: title,
              description: description,
              category: category,
              fileJson: fileJson
            }
          });
        case 10:
          return _context.a(2, _context.v);
        case 11:
          _context.p = 11;
          _t2 = _context.v;
          if (!(fileJson !== null && fileJson !== void 0 && fileJson.publicId)) {
            _context.n = 12;
            break;
          }
          _context.n = 12;
          return _cloudinaryServices["default"].deleteFromCloudinary(fileJson.publicId, 'raw');
        case 12:
          throw _t2;
        case 13:
          return _context.a(2);
      }
    }, _callee, null, [[6, 11], [2, 4]]);
  }));
  return function createCV(_x) {
    return _ref.apply(this, arguments);
  };
}();
var updateCV = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(id, request) {
    var title, description, file, category, userId, existing, finalTitle, finalDescription, finalCategory, updatedFileJson, originalName, safeNameWithoutExt, safeFileName, _existing$fileJson, uploadedFile, _updatedFileJson, _existing$fileJson2, _t3, _t4;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.p = _context2.n) {
        case 0:
          title = request.title, description = request.description, file = request.file, category = request.category, userId = request.userId;
          _context2.n = 1;
          return _database.prismaClient.cV.findUnique({
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
          throw new _apiErrorUtils.ApiError(_httpStatusCodes.StatusCodes.NOT_FOUND, 'CV tidak ditemukan');
        case 2:
          finalTitle = (title === null || title === void 0 ? void 0 : title.trim()) || existing.title;
          finalDescription = description !== null && description !== void 0 ? description : existing.description;
          finalCategory = category || existing.category;
          updatedFileJson = existing.fileJson;
          if (!file) {
            _context2.n = 7;
            break;
          }
          // Hapus ekstensi dari nama file untuk publicId Cloudinary
          originalName = file.name.trim().replace(/\s+/g, '-');
          safeNameWithoutExt = removeFileExtension(originalName);
          safeFileName = "cv-".concat(safeNameWithoutExt);
          _context2.p = 3;
          _context2.n = 4;
          return _cloudinaryServices["default"].uploadToCloudinary('cvs', file, safeFileName, 'raw');
        case 4:
          uploadedFile = _context2.v;
          if (!((_existing$fileJson = existing.fileJson) !== null && _existing$fileJson !== void 0 && _existing$fileJson.publicId)) {
            _context2.n = 5;
            break;
          }
          _context2.n = 5;
          return _cloudinaryServices["default"].deleteFromCloudinary(existing.fileJson.publicId, 'raw');
        case 5:
          updatedFileJson = {
            publicId: uploadedFile.publicId,
            fileUrl: uploadedFile.fileUrlAttachment
          };
          _context2.n = 7;
          break;
        case 6:
          _context2.p = 6;
          _t3 = _context2.v;
          throw new _apiErrorUtils.ApiError(_httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR, 'Gagal mengunggah file baru');
        case 7:
          _context2.p = 7;
          (0, _validation.validate)(_cvValidation.cvsValidation, {
            title: finalTitle,
            description: finalDescription,
            category: finalCategory,
            fileJson: updatedFileJson
          });
          _context2.n = 10;
          break;
        case 8:
          _context2.p = 8;
          _t4 = _context2.v;
          if (!(file && ((_updatedFileJson = updatedFileJson) === null || _updatedFileJson === void 0 ? void 0 : _updatedFileJson.publicId) !== ((_existing$fileJson2 = existing.fileJson) === null || _existing$fileJson2 === void 0 ? void 0 : _existing$fileJson2.publicId))) {
            _context2.n = 9;
            break;
          }
          _context2.n = 9;
          return _cloudinaryServices["default"].deleteFromCloudinary(updatedFileJson.publicId, 'raw');
        case 9:
          throw _t4;
        case 10:
          return _context2.a(2, _database.prismaClient.cV.update({
            where: {
              id: id
            },
            data: {
              title: finalTitle,
              description: finalDescription,
              category: finalCategory,
              fileJson: updatedFileJson
            }
          }));
      }
    }, _callee2, null, [[7, 8], [3, 6]]);
  }));
  return function updateCV(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();
var getAllCv = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
    var page,
      limit,
      userId,
      _getPagination,
      skip,
      take,
      metadata,
      whereClause,
      _yield$Promise$all,
      _yield$Promise$all2,
      data,
      total,
      _args3 = arguments;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.n) {
        case 0:
          page = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : 1;
          limit = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : 5;
          userId = _args3.length > 2 ? _args3[2] : undefined;
          _getPagination = (0, _baseFuncUtils.getPagination)({
            page: page,
            limit: limit
          }), skip = _getPagination.skip, take = _getPagination.limit, metadata = _getPagination.metadata;
          whereClause = userId ? {
            userId: userId
          } : {};
          _context3.n = 1;
          return Promise.all([_database.prismaClient.cV.findMany({
            where: whereClause,
            skip: skip,
            take: take,
            orderBy: {
              createdAt: 'desc'
            }
          }), _database.prismaClient.cV.count({
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
  return function getAllCv() {
    return _ref3.apply(this, arguments);
  };
}();
var getCV = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(userId, category) {
    var cv;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.n) {
        case 0:
          if (userId) {
            _context4.n = 1;
            break;
          }
          throw new _apiErrorUtils.ApiError(_httpStatusCodes.StatusCodes.BAD_REQUEST, 'User ID wajib diisi');
        case 1:
          if (category) {
            _context4.n = 2;
            break;
          }
          throw new _apiErrorUtils.ApiError(_httpStatusCodes.StatusCodes.BAD_REQUEST, 'Kategori CV wajib diisi');
        case 2:
          _context4.n = 3;
          return _database.prismaClient.cV.findFirst({
            where: {
              userId: userId,
              category: category
            }
          });
        case 3:
          cv = _context4.v;
          if (cv) {
            _context4.n = 4;
            break;
          }
          throw new _apiErrorUtils.ApiError(_httpStatusCodes.StatusCodes.NOT_FOUND, 'CV tidak ditemukan untuk user dan kategori ini');
        case 4:
          return _context4.a(2, cv);
      }
    }, _callee4);
  }));
  return function getCV(_x4, _x5) {
    return _ref4.apply(this, arguments);
  };
}();
var deleteCV = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(id) {
    var _existing$fileJson3;
    var existing;
    return _regenerator().w(function (_context5) {
      while (1) switch (_context5.n) {
        case 0:
          if (id) {
            _context5.n = 1;
            break;
          }
          throw new _apiErrorUtils.ApiError(_httpStatusCodes.StatusCodes.BAD_REQUEST, 'ID CV wajib diisi');
        case 1:
          _context5.n = 2;
          return _database.prismaClient.cV.findUnique({
            where: {
              id: id
            }
          });
        case 2:
          existing = _context5.v;
          if (existing) {
            _context5.n = 3;
            break;
          }
          throw new _apiErrorUtils.ApiError(_httpStatusCodes.StatusCodes.NOT_FOUND, 'CV tidak ditemukan');
        case 3:
          if (!((_existing$fileJson3 = existing.fileJson) !== null && _existing$fileJson3 !== void 0 && _existing$fileJson3.publicId)) {
            _context5.n = 4;
            break;
          }
          _context5.n = 4;
          return _cloudinaryServices["default"].deleteFromCloudinary(existing.fileJson.publicId, 'raw');
        case 4:
          _context5.n = 5;
          return _database.prismaClient.cV["delete"]({
            where: {
              id: id
            }
          });
        case 5:
          return _context5.a(2);
      }
    }, _callee5);
  }));
  return function deleteCV(_x6) {
    return _ref5.apply(this, arguments);
  };
}();
var _default = exports["default"] = {
  createCV: createCV,
  updateCV: updateCV,
  getAllCv: getAllCv,
  getCV: getCV,
  deleteCV: deleteCV
};