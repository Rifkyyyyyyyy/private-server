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
var _projectValidation = require("../../validation/project-validation.js");
var _slugify = _interopRequireDefault(require("slugify"));
var _cloudinaryServices = _interopRequireDefault(require("../cloudinary/cloudinary-services.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var MAX_FILE_SIZE = 10 * 1024 * 1024;
var MAX_FILE_COUNT = 8;
var allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'video/mp4', 'video/webm', 'video/ogg'];
var createProject = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(request) {
    var userId, title, description, tags, _request$detail, detail, _request$fileBanners, fileBanners, _iterator, _step, file, slug, banners, detailWithBanners, existing, project, _t;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.p = _context3.n) {
        case 0:
          userId = request.userId, title = request.title, description = request.description, tags = request.tags, _request$detail = request.detail, detail = _request$detail === void 0 ? {} : _request$detail, _request$fileBanners = request.fileBanners, fileBanners = _request$fileBanners === void 0 ? [] : _request$fileBanners;
          if (!(fileBanners.length > MAX_FILE_COUNT)) {
            _context3.n = 1;
            break;
          }
          throw new _apiErrorUtils.ApiError(_httpStatusCodes.StatusCodes.BAD_REQUEST, "Maksimal file banner adalah ".concat(MAX_FILE_COUNT));
        case 1:
          _iterator = _createForOfIteratorHelper(fileBanners);
          _context3.p = 2;
          _iterator.s();
        case 3:
          if ((_step = _iterator.n()).done) {
            _context3.n = 6;
            break;
          }
          file = _step.value;
          if (!(file.size > MAX_FILE_SIZE)) {
            _context3.n = 4;
            break;
          }
          throw new _apiErrorUtils.ApiError(_httpStatusCodes.StatusCodes.BAD_REQUEST, "File \"".concat(file.name || 'unknown', "\" melebihi ukuran maksimal 10 MB"));
        case 4:
          if (allowedMimeTypes.includes(file.mimetype)) {
            _context3.n = 5;
            break;
          }
          throw new _apiErrorUtils.ApiError(_httpStatusCodes.StatusCodes.BAD_REQUEST, "Format file \"".concat(file.name || 'unknown', "\" tidak didukung. Hanya gambar atau video yang diizinkan."));
        case 5:
          _context3.n = 3;
          break;
        case 6:
          _context3.n = 8;
          break;
        case 7:
          _context3.p = 7;
          _t = _context3.v;
          _iterator.e(_t);
        case 8:
          _context3.p = 8;
          _iterator.f();
          return _context3.f(8);
        case 9:
          slug = (0, _slugify["default"])(title, {
            lower: true,
            strict: true
          });
          banners = [];
          if (!fileBanners.length) {
            _context3.n = 11;
            break;
          }
          _context3.n = 10;
          return Promise.all(fileBanners.map(/*#__PURE__*/function () {
            var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(file, idx) {
              var resourceType, filename, uploadResult;
              return _regenerator().w(function (_context) {
                while (1) switch (_context.n) {
                  case 0:
                    resourceType = file.mimetype.startsWith('video') ? 'video' : 'image';
                    filename = "".concat(slug, "-banner-").concat(Date.now(), "-").concat(idx);
                    _context.n = 1;
                    return _cloudinaryServices["default"].uploadToCloudinary('projects/banners', file, filename, resourceType);
                  case 1:
                    uploadResult = _context.v;
                    return _context.a(2, {
                      url: uploadResult.fileUrl,
                      publicId: uploadResult.publicId
                    });
                }
              }, _callee);
            }));
            return function (_x2, _x3) {
              return _ref2.apply(this, arguments);
            };
          }()));
        case 10:
          banners = _context3.v;
        case 11:
          detailWithBanners = _objectSpread(_objectSpread({}, detail), {}, {
            banners: banners,
            title: title
          });
          _context3.n = 12;
          return (0, _validation.validate)(_projectValidation.projectValidation, {
            title: title,
            description: description,
            tags: tags,
            detail: detailWithBanners
          });
        case 12:
          _context3.n = 13;
          return _database.prismaClient.project.findUnique({
            where: {
              slug: slug
            }
          });
        case 13:
          existing = _context3.v;
          if (!existing) {
            _context3.n = 14;
            break;
          }
          throw new _apiErrorUtils.ApiError(_httpStatusCodes.StatusCodes.CONFLICT, 'Judul proyek sudah digunakan, coba judul lain');
        case 14:
          _context3.n = 15;
          return _database.prismaClient.$transaction(/*#__PURE__*/function () {
            var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(tx) {
              var createdProject, createdDetail;
              return _regenerator().w(function (_context2) {
                while (1) switch (_context2.n) {
                  case 0:
                    _context2.n = 1;
                    return tx.project.create({
                      data: {
                        userId: userId,
                        title: title,
                        slug: slug,
                        description: description,
                        tags: tags
                      }
                    });
                  case 1:
                    createdProject = _context2.v;
                    _context2.n = 2;
                    return tx.detailProject.create({
                      data: {
                        projectId: createdProject.id,
                        userId: userId,
                        title: title,
                        contentHtml: detail.contentHtml || '',
                        status: detail.status || 'PUBLISHED',
                        repository: detail.repository || null,
                        banners: banners
                      }
                    });
                  case 2:
                    createdDetail = _context2.v;
                    return _context2.a(2, _objectSpread(_objectSpread({}, createdProject), {}, {
                      detail: createdDetail
                    }));
                }
              }, _callee2);
            }));
            return function (_x4) {
              return _ref3.apply(this, arguments);
            };
          }());
        case 15:
          project = _context3.v;
          return _context3.a(2, project);
      }
    }, _callee3, null, [[2, 7, 8, 9]]);
  }));
  return function createProject(_x) {
    return _ref.apply(this, arguments);
  };
}();
var updateProject = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(id, request) {
    var title, description, tags, _request$detail2, detail, _request$fileBanners2, fileBanners, project, _iterator2, _step2, file, parsedTags, slug, existing, banners, _detailProject$banner, detailProject, _detailProject, detailWithBanners, updated, _t2;
    return _regenerator().w(function (_context6) {
      while (1) switch (_context6.p = _context6.n) {
        case 0:
          title = request.title, description = request.description, tags = request.tags, _request$detail2 = request.detail, detail = _request$detail2 === void 0 ? {} : _request$detail2, _request$fileBanners2 = request.fileBanners, fileBanners = _request$fileBanners2 === void 0 ? [] : _request$fileBanners2;
          if (!(fileBanners.length > MAX_FILE_COUNT)) {
            _context6.n = 1;
            break;
          }
          throw new _apiErrorUtils.ApiError(_httpStatusCodes.StatusCodes.BAD_REQUEST, "Maksimal file banner adalah ".concat(MAX_FILE_COUNT));
        case 1:
          _context6.n = 2;
          return _database.prismaClient.project.findUnique({
            where: {
              id: id
            }
          });
        case 2:
          project = _context6.v;
          if (project) {
            _context6.n = 3;
            break;
          }
          throw new _apiErrorUtils.ApiError(_httpStatusCodes.StatusCodes.NOT_FOUND, 'Project tidak ditemukan');
        case 3:
          _iterator2 = _createForOfIteratorHelper(fileBanners);
          _context6.p = 4;
          _iterator2.s();
        case 5:
          if ((_step2 = _iterator2.n()).done) {
            _context6.n = 8;
            break;
          }
          file = _step2.value;
          if (!(file.size > MAX_FILE_SIZE)) {
            _context6.n = 6;
            break;
          }
          throw new _apiErrorUtils.ApiError(_httpStatusCodes.StatusCodes.BAD_REQUEST, "File \"".concat(file.name || 'unknown', "\" melebihi ukuran maksimal 10 MB"));
        case 6:
          if (allowedMimeTypes.includes(file.mimetype)) {
            _context6.n = 7;
            break;
          }
          throw new _apiErrorUtils.ApiError(_httpStatusCodes.StatusCodes.BAD_REQUEST, "Format file \"".concat(file.name || 'unknown', "\" tidak didukung. Hanya gambar atau video yang diizinkan."));
        case 7:
          _context6.n = 5;
          break;
        case 8:
          _context6.n = 10;
          break;
        case 9:
          _context6.p = 9;
          _t2 = _context6.v;
          _iterator2.e(_t2);
        case 10:
          _context6.p = 10;
          _iterator2.f();
          return _context6.f(10);
        case 11:
          parsedTags = typeof tags === 'string' ? tags.split(',').map(function (t) {
            return t.trim();
          }).filter(Boolean) : tags || [];
          slug = project.slug;
          if (!(title && title !== project.title)) {
            _context6.n = 13;
            break;
          }
          slug = (0, _slugify["default"])(title, {
            lower: true,
            strict: true
          });
          _context6.n = 12;
          return _database.prismaClient.project.findUnique({
            where: {
              slug: slug
            }
          });
        case 12:
          existing = _context6.v;
          if (!(existing && existing.id !== id)) {
            _context6.n = 13;
            break;
          }
          throw new _apiErrorUtils.ApiError(_httpStatusCodes.StatusCodes.CONFLICT, 'Judul proyek sudah digunakan, coba judul lain');
        case 13:
          banners = [];
          if (!fileBanners.length) {
            _context6.n = 17;
            break;
          }
          _context6.n = 14;
          return _database.prismaClient.detailProject.findUnique({
            where: {
              projectId: id
            }
          });
        case 14:
          detailProject = _context6.v;
          if (!(detailProject !== null && detailProject !== void 0 && (_detailProject$banner = detailProject.banners) !== null && _detailProject$banner !== void 0 && _detailProject$banner.length)) {
            _context6.n = 15;
            break;
          }
          _context6.n = 15;
          return Promise.all(detailProject.banners.map(function (b) {
            return _cloudinaryServices["default"].deleteFromCloudinary(b.publicId, 'auto');
          }));
        case 15:
          _context6.n = 16;
          return Promise.all(fileBanners.map(/*#__PURE__*/function () {
            var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(file, idx) {
              var resourceType, filename, uploadResult;
              return _regenerator().w(function (_context4) {
                while (1) switch (_context4.n) {
                  case 0:
                    resourceType = file.mimetype.startsWith('video') ? 'video' : 'image';
                    filename = "".concat(slug, "-banner-").concat(Date.now(), "-").concat(idx);
                    _context4.n = 1;
                    return _cloudinaryServices["default"].uploadToCloudinary('projects/banners', file, filename, resourceType);
                  case 1:
                    uploadResult = _context4.v;
                    return _context4.a(2, {
                      url: uploadResult.fileUrl,
                      publicId: uploadResult.publicId
                    });
                }
              }, _callee4);
            }));
            return function (_x7, _x8) {
              return _ref5.apply(this, arguments);
            };
          }()));
        case 16:
          banners = _context6.v;
          _context6.n = 19;
          break;
        case 17:
          _context6.n = 18;
          return _database.prismaClient.detailProject.findUnique({
            where: {
              projectId: id
            }
          });
        case 18:
          _detailProject = _context6.v;
          banners = (_detailProject === null || _detailProject === void 0 ? void 0 : _detailProject.banners) || [];
        case 19:
          detailWithBanners = _objectSpread(_objectSpread({}, detail), {}, {
            banners: banners,
            title: title || project.title
          });
          _context6.n = 20;
          return (0, _validation.validate)(_projectValidation.projectValidation, {
            title: title || project.title,
            description: description || project.description,
            tags: parsedTags,
            detail: detailWithBanners
          });
        case 20:
          _context6.n = 21;
          return _database.prismaClient.$transaction(/*#__PURE__*/function () {
            var _ref6 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(tx) {
              var updatedProject, updatedDetail;
              return _regenerator().w(function (_context5) {
                while (1) switch (_context5.n) {
                  case 0:
                    _context5.n = 1;
                    return tx.project.update({
                      where: {
                        id: id
                      },
                      data: {
                        title: title,
                        slug: slug,
                        description: description,
                        tags: parsedTags
                      }
                    });
                  case 1:
                    updatedProject = _context5.v;
                    _context5.n = 2;
                    return tx.detailProject.update({
                      where: {
                        projectId: id
                      },
                      data: {
                        title: title || project.title,
                        contentHtml: detail.contentHtml,
                        status: detail.status,
                        repository: detail.repository,
                        banners: banners
                      }
                    });
                  case 2:
                    updatedDetail = _context5.v;
                    return _context5.a(2, _objectSpread(_objectSpread({}, updatedProject), {}, {
                      detail: updatedDetail
                    }));
                }
              }, _callee5);
            }));
            return function (_x9) {
              return _ref6.apply(this, arguments);
            };
          }());
        case 21:
          updated = _context6.v;
          return _context6.a(2, updated);
      }
    }, _callee6, null, [[4, 9, 10, 11]]);
  }));
  return function updateProject(_x5, _x6) {
    return _ref4.apply(this, arguments);
  };
}();
var getAllProject = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
    var page,
      limit,
      userId,
      skip,
      where,
      _yield$prismaClient$$,
      _yield$prismaClient$$2,
      projects,
      total,
      _args7 = arguments;
    return _regenerator().w(function (_context7) {
      while (1) switch (_context7.n) {
        case 0:
          page = _args7.length > 0 && _args7[0] !== undefined ? _args7[0] : 1;
          limit = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : 5;
          userId = _args7.length > 2 ? _args7[2] : undefined;
          skip = (page - 1) * limit;
          where = userId ? {
            userId: userId
          } : {};
          _context7.n = 1;
          return _database.prismaClient.$transaction([_database.prismaClient.project.findMany({
            where: where,
            skip: skip,
            take: limit,
            orderBy: {
              createdAt: 'desc'
            },
            include: {
              detail: true,
              user: true
            }
          }), _database.prismaClient.project.count({
            where: where
          })]);
        case 1:
          _yield$prismaClient$$ = _context7.v;
          _yield$prismaClient$$2 = _slicedToArray(_yield$prismaClient$$, 2);
          projects = _yield$prismaClient$$2[0];
          total = _yield$prismaClient$$2[1];
          return _context7.a(2, {
            data: projects,
            meta: {
              page: page,
              limit: limit,
              total: total,
              totalPages: Math.ceil(total / limit)
            }
          });
      }
    }, _callee7);
  }));
  return function getAllProject() {
    return _ref7.apply(this, arguments);
  };
}();
var getDetailProjectBySlug = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(slug) {
    var project;
    return _regenerator().w(function (_context8) {
      while (1) switch (_context8.n) {
        case 0:
          _context8.n = 1;
          return _database.prismaClient.project.findUnique({
            where: {
              slug: slug
            },
            include: {
              detail: true,
              user: true
            }
          });
        case 1:
          project = _context8.v;
          if (project) {
            _context8.n = 2;
            break;
          }
          throw new _apiErrorUtils.ApiError(_httpStatusCodes.StatusCodes.NOT_FOUND, 'Project tidak ditemukan');
        case 2:
          return _context8.a(2, project);
      }
    }, _callee8);
  }));
  return function getDetailProjectBySlug(_x0) {
    return _ref8.apply(this, arguments);
  };
}();
var deleteProject = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(id) {
    var _project$detail;
    var project;
    return _regenerator().w(function (_context9) {
      while (1) switch (_context9.n) {
        case 0:
          _context9.n = 1;
          return _database.prismaClient.project.findUnique({
            where: {
              id: id
            },
            include: {
              detail: true
            }
          });
        case 1:
          project = _context9.v;
          if (project) {
            _context9.n = 2;
            break;
          }
          throw new _apiErrorUtils.ApiError(_httpStatusCodes.StatusCodes.NOT_FOUND, 'Project tidak ditemukan');
        case 2:
          if (!((_project$detail = project.detail) !== null && _project$detail !== void 0 && (_project$detail = _project$detail.banners) !== null && _project$detail !== void 0 && _project$detail.length)) {
            _context9.n = 3;
            break;
          }
          _context9.n = 3;
          return Promise.all(project.detail.banners.map(function (b) {
            return _cloudinaryServices["default"].deleteFromCloudinary(b.publicId, 'image');
          }));
        case 3:
          _context9.n = 4;
          return _database.prismaClient.$transaction([_database.prismaClient.detailProject["delete"]({
            where: {
              projectId: id
            }
          }), _database.prismaClient.project["delete"]({
            where: {
              id: id
            }
          })]);
        case 4:
          return _context9.a(2, true);
      }
    }, _callee9);
  }));
  return function deleteProject(_x1) {
    return _ref9.apply(this, arguments);
  };
}();
var _default = exports["default"] = {
  createProject: createProject,
  updateProject: updateProject,
  getAllProject: getAllProject,
  getDetailProjectBySlug: getDetailProjectBySlug,
  deleteProject: deleteProject
};