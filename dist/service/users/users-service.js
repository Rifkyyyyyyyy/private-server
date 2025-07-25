"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _database = require("../../application/database.js");
var _validation = require("../../validation/validation.js");
var _apiErrorUtils = require("../../utils/apiError-utils.js");
var _httpStatusCodes = require("http-status-codes");
var _authValidation = require("../../validation/auth-validation.js");
var _cloudinaryServices = _interopRequireDefault(require("../cloudinary/cloudinary-services.js"));
var _baseFuncUtils = require("../../utils/base-func-utils.js");
var _nanoid = require("nanoid");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
/**
 * Ambil data user berdasarkan ID tanpa mengembalikan password
 * @param {string} id - ID user
 * @returns {Promise<Object>} Data user tanpa password
 */
var getUserById = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(id) {
    var user;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          _context.n = 1;
          return _database.prismaClient.user.findUnique({
            where: {
              id: id
            },
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
              apiKey: true,
              about: true,
              profilePhoto: true,
              createdAt: true,
              updatedAt: true
            }
          });
        case 1:
          user = _context.v;
          if (user) {
            _context.n = 2;
            break;
          }
          throw new _apiErrorUtils.ApiError(_httpStatusCodes.StatusCodes.NOT_FOUND, 'User tidak ditemukan');
        case 2:
          return _context.a(2, user);
      }
    }, _callee);
  }));
  return function getUserById(_x) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * Update data user, termasuk upload foto profil jika ada
 * @param {string} id - ID user
 * @param {Object} request - Data yang akan diupdate
 * @param {File} [request.avatar] - File foto avatar baru (optional)
 * @param {string} request.name - Nama user
 * @param {string} request.about - Deskripsi about user
 * @returns {Promise<Object>} Data user yang sudah diupdate tanpa password
 */

var updateUser = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(id, request) {
    var _request$email, _request$name, _request$about, _request$name2, _request$about2;
    var user, profilePhoto, photo, uploaded, profilePhotoForValidation, dataToUpdate, updatedUser;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          _context2.n = 1;
          return _database.prismaClient.user.findUnique({
            where: {
              id: id
            }
          });
        case 1:
          user = _context2.v;
          if (user) {
            _context2.n = 2;
            break;
          }
          throw new _apiErrorUtils.ApiError(_httpStatusCodes.StatusCodes.NOT_FOUND, 'User tidak ditemukan');
        case 2:
          profilePhoto = user.profilePhoto;
          photo = null;
          if (!request.avatar) {
            _context2.n = 5;
            break;
          }
          if (!(profilePhoto !== null && profilePhoto !== void 0 && profilePhoto.publicId)) {
            _context2.n = 3;
            break;
          }
          _context2.n = 3;
          return _cloudinaryServices["default"].deleteFromCloudinary(profilePhoto.publicId);
        case 3:
          _context2.n = 4;
          return _cloudinaryServices["default"].uploadToCloudinary('avatars', request.avatar, "avatar-".concat(id), 'image');
        case 4:
          uploaded = _context2.v;
          photo = {
            url: uploaded.fileUrl,
            publicId: uploaded.publicId
          };
        case 5:
          // Pastikan about berupa string
          if (request.about === undefined || request.about === null) {
            request.about = '';
          }

          // Kalau profilePhoto null, hapus supaya gak divalidasi
          if (request.profilePhoto === null) {
            delete request.profilePhoto;
          }

          // Tentukan objek profilePhoto yang valid untuk validasi

          if (photo && Object.keys(photo).length > 0) {
            profilePhotoForValidation = photo;
          } else if (request.profilePhoto && _typeof(request.profilePhoto) === 'object' && request.profilePhoto.url && request.profilePhoto.publicId) {
            profilePhotoForValidation = request.profilePhoto;
          } else {
            profilePhotoForValidation = undefined;
          }

          // Validasi lengkap
          (0, _validation.validate)(_authValidation.updateUserValidation, {
            email: (_request$email = request.email) !== null && _request$email !== void 0 ? _request$email : user.email,
            password: request.password,
            name: (_request$name = request.name) !== null && _request$name !== void 0 ? _request$name : user.name,
            about: (_request$about = request.about) !== null && _request$about !== void 0 ? _request$about : user.about,
            profilePhoto: profilePhotoForValidation
          });
          dataToUpdate = {
            name: (_request$name2 = request.name) !== null && _request$name2 !== void 0 ? _request$name2 : user.name,
            about: (_request$about2 = request.about) !== null && _request$about2 !== void 0 ? _request$about2 : user.about,
            profilePhoto: profilePhotoForValidation !== null && profilePhotoForValidation !== void 0 ? profilePhotoForValidation : profilePhoto
          };
          if (!request.password) {
            _context2.n = 7;
            break;
          }
          _context2.n = 6;
          return _bcrypt["default"].hash(request.password, 10);
        case 6:
          dataToUpdate.password = _context2.v;
        case 7:
          _context2.n = 8;
          return _database.prismaClient.user.update({
            where: {
              id: id
            },
            data: dataToUpdate,
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
              apiKey: true,
              about: true,
              profilePhoto: true,
              createdAt: true
            }
          });
        case 8:
          updatedUser = _context2.v;
          return _context2.a(2, updatedUser);
      }
    }, _callee2);
  }));
  return function updateUser(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * Registrasi user baru dengan validasi dan hashing password,
 * ID user dibuat dengan format "user-<unik>"
 * @param {Object} request
 * @param {string} request.name
 * @param {string} request.email
 * @param {string} request.password
 * @returns {Promise<Object>} Data user baru tanpa password
 */
var register = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(request) {
    var name, email, password, existingUser, hashedPassword, id, newUser;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.n) {
        case 0:
          (0, _validation.validate)(_authValidation.registerValidation, {
            name: request.name,
            email: request.email,
            password: request.password
          });
          name = request.name, email = request.email, password = request.password;
          _context3.n = 1;
          return _database.prismaClient.user.findUnique({
            where: {
              email: email
            }
          });
        case 1:
          existingUser = _context3.v;
          if (!existingUser) {
            _context3.n = 2;
            break;
          }
          throw new _apiErrorUtils.ApiError(_httpStatusCodes.StatusCodes.BAD_REQUEST, 'Email sudah terdaftar');
        case 2:
          _context3.n = 3;
          return _bcrypt["default"].hash(password, 10);
        case 3:
          hashedPassword = _context3.v;
          id = "user-".concat((0, _nanoid.nanoid)(10));
          _context3.n = 4;
          return _database.prismaClient.user.create({
            data: {
              id: id,
              name: name,
              email: email,
              password: hashedPassword,
              apiKey: (0, _baseFuncUtils.generateApiKey)()
            },
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
              apiKey: true,
              about: true,
              profilePhoto: true,
              createdAt: true,
              updatedAt: true
            }
          });
        case 4:
          newUser = _context3.v;
          return _context3.a(2, newUser);
      }
    }, _callee3);
  }));
  return function register(_x4) {
    return _ref3.apply(this, arguments);
  };
}();

/**
 * Login user dengan email dan password
 * @param {Object} request
 * @param {string} request.email
 * @param {string} request.password
 * @returns {Promise<Object>} Data user jika berhasil login tanpa password
 */
var loginWithEmailPassword = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(request) {
    var email, password, user, isPasswordValid;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.n) {
        case 0:
          (0, _validation.validate)(_authValidation.loginValidation, {
            email: request.email,
            password: request.password
          });
          email = request.email, password = request.password;
          _context4.n = 1;
          return _database.prismaClient.user.findUnique({
            where: {
              email: email
            }
          });
        case 1:
          user = _context4.v;
          if (user) {
            _context4.n = 2;
            break;
          }
          throw new _apiErrorUtils.ApiError(_httpStatusCodes.StatusCodes.UNAUTHORIZED, 'Email tidak ditemukan');
        case 2:
          _context4.n = 3;
          return _bcrypt["default"].compare(password, user.password);
        case 3:
          isPasswordValid = _context4.v;
          if (isPasswordValid) {
            _context4.n = 4;
            break;
          }
          throw new _apiErrorUtils.ApiError(_httpStatusCodes.StatusCodes.UNAUTHORIZED, 'Password salah');
        case 4:
          return _context4.a(2, {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            apiKey: user.apiKey,
            profilePhoto: user.profilePhoto || null,
            about: user.about || null
          });
      }
    }, _callee4);
  }));
  return function loginWithEmailPassword(_x5) {
    return _ref4.apply(this, arguments);
  };
}();

/**
 * Hapus user dan foto profil dari Cloudinary jika ada
 * @param {string} userId
 * @returns {Promise<Object>} Data user yang dihapus tanpa password
 */
var deleteUser = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(userId) {
    var _user$profilePhoto;
    var user, deletedUser;
    return _regenerator().w(function (_context5) {
      while (1) switch (_context5.n) {
        case 0:
          _context5.n = 1;
          return _database.prismaClient.user.findUnique({
            where: {
              id: userId
            }
          });
        case 1:
          user = _context5.v;
          if (user) {
            _context5.n = 2;
            break;
          }
          throw new _apiErrorUtils.ApiError(_httpStatusCodes.StatusCodes.NOT_FOUND, 'User tidak ditemukan');
        case 2:
          if (!((_user$profilePhoto = user.profilePhoto) !== null && _user$profilePhoto !== void 0 && _user$profilePhoto.publicId)) {
            _context5.n = 3;
            break;
          }
          _context5.n = 3;
          return _cloudinaryServices["default"].deleteFromCloudinary(user.profilePhoto.publicId);
        case 3:
          _context5.n = 4;
          return _database.prismaClient.user["delete"]({
            where: {
              id: userId
            },
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
              apiKey: true,
              about: true,
              profilePhoto: true,
              createdAt: true,
              updatedAt: true
            }
          });
        case 4:
          deletedUser = _context5.v;
          return _context5.a(2, deletedUser);
      }
    }, _callee5);
  }));
  return function deleteUser(_x6) {
    return _ref5.apply(this, arguments);
  };
}();
var _default = exports["default"] = {
  register: register,
  loginWithEmailPassword: loginWithEmailPassword,
  updateUser: updateUser,
  deleteUser: deleteUser,
  getUserById: getUserById
};