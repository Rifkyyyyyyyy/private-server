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
var _blogValidation = require("../../validation/blog-validation.js");
var _slugify = _interopRequireDefault(require("slugify"));
var _cloudinaryServices = _interopRequireDefault(require("../cloudinary/cloudinary-services.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; } // blog-services.js
var MAX_FILE_SIZE = 10 * 1024 * 1024;
var allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];
var createBlog = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(request) {
    var userId, title, summary, _request$detail, detail, coverFile, slug, filename, resourceType, uploadResult, cover, detailWithSyncedTitle, existing, blog;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          userId = request.userId, title = request.title, summary = request.summary, _request$detail = request.detail, detail = _request$detail === void 0 ? {} : _request$detail, coverFile = request.coverFile;
          if (coverFile) {
            _context2.n = 1;
            break;
          }
          throw new _apiErrorUtils.ApiError(_httpStatusCodes.StatusCodes.BAD_REQUEST, 'File cover wajib diupload');
        case 1:
          if (!(coverFile.size > MAX_FILE_SIZE)) {
            _context2.n = 2;
            break;
          }
          throw new _apiErrorUtils.ApiError(_httpStatusCodes.StatusCodes.BAD_REQUEST, 'Ukuran file cover maksimal 10 MB');
        case 2:
          if (allowedMimeTypes.includes(coverFile.mimetype)) {
            _context2.n = 3;
            break;
          }
          throw new _apiErrorUtils.ApiError(_httpStatusCodes.StatusCodes.BAD_REQUEST, 'Format file cover tidak didukung');
        case 3:
          slug = (0, _slugify["default"])(title, {
            lower: true,
            strict: true
          }); // Upload cover ke Cloudinary
          filename = "blog-cover-".concat(Date.now());
          resourceType = 'image';
          _context2.n = 4;
          return _cloudinaryServices["default"].uploadToCloudinary('blogs/covers', coverFile, filename, resourceType);
        case 4:
          uploadResult = _context2.v;
          cover = {
            url: uploadResult.fileUrl,
            publicId: uploadResult.publicId
          };
          detailWithSyncedTitle = _objectSpread(_objectSpread({}, detail), {}, {
            title: title // sinkronisasi title detail
          });
          _context2.n = 5;
          return (0, _validation.validate)(_blogValidation.blogValidation, {
            title: title,
            slug: slug,
            summary: summary,
            cover: cover,
            detail: detailWithSyncedTitle
          });
        case 5:
          _context2.n = 6;
          return _database.prismaClient.blog.findUnique({
            where: {
              slug: slug
            }
          });
        case 6:
          existing = _context2.v;
          if (!existing) {
            _context2.n = 7;
            break;
          }
          throw new _apiErrorUtils.ApiError(_httpStatusCodes.StatusCodes.CONFLICT, 'Judul blog sudah digunakan');
        case 7:
          _context2.n = 8;
          return _database.prismaClient.$transaction(/*#__PURE__*/function () {
            var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(tx) {
              var createdBlog, createdDetail;
              return _regenerator().w(function (_context) {
                while (1) switch (_context.n) {
                  case 0:
                    _context.n = 1;
                    return tx.blog.create({
                      data: {
                        authorId: userId,
                        title: title,
                        slug: slug,
                        summary: summary,
                        cover: cover
                      }
                    });
                  case 1:
                    createdBlog = _context.v;
                    _context.n = 2;
                    return tx.blogDetail.create({
                      data: {
                        blogId: createdBlog.id,
                        title: title,
                        contentHtml: detail.contentHtml,
                        thumbail: cover // <== pake cover sebagai thumbnail
                      }
                    });
                  case 2:
                    createdDetail = _context.v;
                    return _context.a(2, _objectSpread(_objectSpread({}, createdBlog), {}, {
                      detail: createdDetail
                    }));
                }
              }, _callee);
            }));
            return function (_x2) {
              return _ref2.apply(this, arguments);
            };
          }());
        case 8:
          blog = _context2.v;
          return _context2.a(2, blog);
      }
    }, _callee2);
  }));
  return function createBlog(_x) {
    return _ref.apply(this, arguments);
  };
}();
var updateBlog = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(id, request) {
    var title, summary, _request$detail2, detail, coverFile, blog, slug, existing, cover, _cover, filename, uploadResult, detailWithSyncedTitle, updated;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.n) {
        case 0:
          title = request.title, summary = request.summary, _request$detail2 = request.detail, detail = _request$detail2 === void 0 ? {} : _request$detail2, coverFile = request.coverFile;
          _context4.n = 1;
          return _database.prismaClient.blog.findUnique({
            where: {
              id: id
            },
            include: {
              detail: true
            }
          });
        case 1:
          blog = _context4.v;
          if (blog) {
            _context4.n = 2;
            break;
          }
          throw new _apiErrorUtils.ApiError(_httpStatusCodes.StatusCodes.NOT_FOUND, 'Blog tidak ditemukan');
        case 2:
          slug = blog.slug;
          if (!(title && title !== blog.title)) {
            _context4.n = 4;
            break;
          }
          slug = (0, _slugify["default"])(title, {
            lower: true,
            strict: true
          });
          _context4.n = 3;
          return _database.prismaClient.blog.findUnique({
            where: {
              slug: slug
            }
          });
        case 3:
          existing = _context4.v;
          if (!(existing && existing.id !== id)) {
            _context4.n = 4;
            break;
          }
          throw new _apiErrorUtils.ApiError(_httpStatusCodes.StatusCodes.CONFLICT, 'Judul blog sudah digunakan');
        case 4:
          cover = blog.cover;
          if (!coverFile) {
            _context4.n = 9;
            break;
          }
          if (!(coverFile.size > MAX_FILE_SIZE)) {
            _context4.n = 5;
            break;
          }
          throw new _apiErrorUtils.ApiError(_httpStatusCodes.StatusCodes.BAD_REQUEST, 'Ukuran file cover maksimal 10 MB');
        case 5:
          if (allowedMimeTypes.includes(coverFile.mimetype)) {
            _context4.n = 6;
            break;
          }
          throw new _apiErrorUtils.ApiError(_httpStatusCodes.StatusCodes.BAD_REQUEST, 'Format file cover tidak didukung');
        case 6:
          if (!((_cover = cover) !== null && _cover !== void 0 && _cover.publicId)) {
            _context4.n = 7;
            break;
          }
          _context4.n = 7;
          return _cloudinaryServices["default"].deleteFromCloudinary(cover.publicId, 'image');
        case 7:
          filename = "blog-cover-".concat(Date.now());
          _context4.n = 8;
          return _cloudinaryServices["default"].uploadToCloudinary('blogs/covers', coverFile, filename, 'image');
        case 8:
          uploadResult = _context4.v;
          cover = {
            url: uploadResult.fileUrl,
            publicId: uploadResult.publicId
          };
        case 9:
          detailWithSyncedTitle = _objectSpread(_objectSpread({}, detail), {}, {
            title: title || blog.title
          });
          _context4.n = 10;
          return (0, _validation.validate)(_blogValidation.blogValidation, {
            title: title || blog.title,
            slug: slug,
            summary: summary,
            cover: cover,
            detail: detailWithSyncedTitle
          });
        case 10:
          _context4.n = 11;
          return _database.prismaClient.$transaction(/*#__PURE__*/function () {
            var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(tx) {
              var updatedBlog, updatedDetail;
              return _regenerator().w(function (_context3) {
                while (1) switch (_context3.n) {
                  case 0:
                    _context3.n = 1;
                    return tx.blog.update({
                      where: {
                        id: id
                      },
                      data: {
                        title: title,
                        slug: slug,
                        summary: summary,
                        cover: cover
                      }
                    });
                  case 1:
                    updatedBlog = _context3.v;
                    _context3.n = 2;
                    return tx.blogDetail.update({
                      where: {
                        blogId: id
                      },
                      data: {
                        title: title || blog.title,
                        contentHtml: detail.contentHtml,
                        thumbail: cover // <== pakai cover
                      }
                    });
                  case 2:
                    updatedDetail = _context3.v;
                    return _context3.a(2, _objectSpread(_objectSpread({}, updatedBlog), {}, {
                      detail: updatedDetail
                    }));
                }
              }, _callee3);
            }));
            return function (_x5) {
              return _ref4.apply(this, arguments);
            };
          }());
        case 11:
          updated = _context4.v;
          return _context4.a(2, updated);
      }
    }, _callee4);
  }));
  return function updateBlog(_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}();
var getAllBlogs = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
    var page,
      limit,
      skip,
      _yield$prismaClient$$,
      _yield$prismaClient$$2,
      blogs,
      total,
      _args5 = arguments;
    return _regenerator().w(function (_context5) {
      while (1) switch (_context5.n) {
        case 0:
          page = _args5.length > 0 && _args5[0] !== undefined ? _args5[0] : 1;
          limit = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : 5;
          skip = (page - 1) * limit;
          _context5.n = 1;
          return _database.prismaClient.$transaction([_database.prismaClient.blog.findMany({
            skip: skip,
            take: limit,
            orderBy: {
              createdAt: 'desc'
            },
            include: {
              detail: true,
              author: true
            }
          }), _database.prismaClient.blog.count()]);
        case 1:
          _yield$prismaClient$$ = _context5.v;
          _yield$prismaClient$$2 = _slicedToArray(_yield$prismaClient$$, 2);
          blogs = _yield$prismaClient$$2[0];
          total = _yield$prismaClient$$2[1];
          return _context5.a(2, {
            data: blogs,
            meta: {
              page: page,
              limit: limit,
              total: total,
              totalPages: Math.ceil(total / limit)
            }
          });
      }
    }, _callee5);
  }));
  return function getAllBlogs() {
    return _ref5.apply(this, arguments);
  };
}();
var getBlogBySlug = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(slug) {
    var blog;
    return _regenerator().w(function (_context6) {
      while (1) switch (_context6.n) {
        case 0:
          _context6.n = 1;
          return _database.prismaClient.blog.findUnique({
            where: {
              slug: slug
            },
            include: {
              detail: true,
              author: true
            }
          });
        case 1:
          blog = _context6.v;
          if (blog) {
            _context6.n = 2;
            break;
          }
          throw new _apiErrorUtils.ApiError(_httpStatusCodes.StatusCodes.NOT_FOUND, 'Blog tidak ditemukan');
        case 2:
          return _context6.a(2, blog);
      }
    }, _callee6);
  }));
  return function getBlogBySlug(_x6) {
    return _ref6.apply(this, arguments);
  };
}();
var deleteBlog = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(id) {
    var _blog$cover, _blog$detail;
    var blog;
    return _regenerator().w(function (_context7) {
      while (1) switch (_context7.n) {
        case 0:
          _context7.n = 1;
          return _database.prismaClient.blog.findUnique({
            where: {
              id: id
            },
            include: {
              detail: true
            }
          });
        case 1:
          blog = _context7.v;
          if (blog) {
            _context7.n = 2;
            break;
          }
          throw new _apiErrorUtils.ApiError(_httpStatusCodes.StatusCodes.NOT_FOUND, 'Blog tidak ditemukan');
        case 2:
          if (!((_blog$cover = blog.cover) !== null && _blog$cover !== void 0 && _blog$cover.publicId)) {
            _context7.n = 3;
            break;
          }
          _context7.n = 3;
          return _cloudinaryServices["default"].deleteFromCloudinary(blog.cover.publicId, 'image');
        case 3:
          if (!((_blog$detail = blog.detail) !== null && _blog$detail !== void 0 && (_blog$detail = _blog$detail.thumbail) !== null && _blog$detail !== void 0 && _blog$detail.publicId)) {
            _context7.n = 4;
            break;
          }
          _context7.n = 4;
          return _cloudinaryServices["default"].deleteFromCloudinary(blog.detail.thumbail.publicId, 'image');
        case 4:
          _context7.n = 5;
          return _database.prismaClient.$transaction([_database.prismaClient.blogDetail["delete"]({
            where: {
              blogId: id
            }
          }), _database.prismaClient.blog["delete"]({
            where: {
              id: id
            }
          })]);
        case 5:
          return _context7.a(2);
      }
    }, _callee7);
  }));
  return function deleteBlog(_x7) {
    return _ref7.apply(this, arguments);
  };
}();
var _default = exports["default"] = {
  createBlog: createBlog,
  updateBlog: updateBlog,
  getAllBlogs: getAllBlogs,
  getBlogBySlug: getBlogBySlug,
  deleteBlog: deleteBlog
};