"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _cloudinary = _interopRequireDefault(require("../../cloudinary.js"));
var _httpStatusCodes = require("http-status-codes");
var _apiErrorUtils = require("../../utils/apiError-utils.js");
var _streamifier = _interopRequireDefault(require("streamifier"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
/**
 * Upload file ke Cloudinary menggunakan stream
 * @param {string} folderName - nama folder di Cloudinary
 * @param {object} file - object file dari req.files
 * @param {string} fileName - nama file (tanpa ekstensi)
 * @param {string} resource_type - tipe resource Cloudinary, default 'raw' untuk dokumen
 * @returns {Promise<{ fileUrl: string, fileUrlAttachment: string, publicId: string, version: number }>}
 */
var uploadToCloudinary = function uploadToCloudinary(folderName, file, fileName) {
  var resource_type = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'raw';
  return new Promise(function (resolve, reject) {
    try {
      if (!folderName || !file || !file.data || !fileName) {
        throw new _apiErrorUtils.ApiError(_httpStatusCodes.StatusCodes.BAD_REQUEST, 'Parameter upload tidak lengkap');
      }
      var uploadStream = _cloudinary["default"].uploader.upload_stream({
        public_id: fileName,
        folder: folderName,
        resource_type: resource_type,
        overwrite: true
      }, function (error, result) {
        if (error) {
          return reject(new _apiErrorUtils.ApiError(_httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR, "Gagal upload file ke Cloudinary: ".concat(error.message)));
        }
        var fileUrl = result.secure_url;
        var fileUrlAttachment = generateAttachmentUrl(result.public_id, resource_type, result.version);
        resolve({
          fileUrl: fileUrl,
          fileUrlAttachment: fileUrlAttachment,
          publicId: result.public_id,
          version: result.version
        });
      });
      _streamifier["default"].createReadStream(file.data).pipe(uploadStream);
    } catch (err) {
      reject(new _apiErrorUtils.ApiError(_httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR, "Gagal upload file ke Cloudinary: ".concat(err.message)));
    }
  });
};

/**
 * Hapus file dari Cloudinary berdasarkan publicId
 * @param {string} publicId 
 * @param {string} resource_type 
 */
var deleteFromCloudinary = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(publicId) {
    var resource_type,
      result,
      _args = arguments,
      _t;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          resource_type = _args.length > 1 && _args[1] !== undefined ? _args[1] : 'raw';
          _context.p = 1;
          if (publicId) {
            _context.n = 2;
            break;
          }
          throw new _apiErrorUtils.ApiError(_httpStatusCodes.StatusCodes.BAD_REQUEST, 'publicId tidak boleh kosong');
        case 2:
          _context.n = 3;
          return _cloudinary["default"].uploader.destroy(publicId, {
            resource_type: resource_type
          });
        case 3:
          result = _context.v;
          if (!(result.result !== 'ok' && result.result !== 'not found')) {
            _context.n = 4;
            break;
          }
          throw new _apiErrorUtils.ApiError(_httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR, "Gagal menghapus file dari Cloudinary: ".concat(result.result));
        case 4:
          _context.n = 6;
          break;
        case 5:
          _context.p = 5;
          _t = _context.v;
          throw new _apiErrorUtils.ApiError(_httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR, "Gagal menghapus file dari Cloudinary: ".concat(_t.message));
        case 6:
          return _context.a(2);
      }
    }, _callee, null, [[1, 5]]);
  }));
  return function deleteFromCloudinary(_x) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * Generate URL Cloudinary dengan flag fl_attachment supaya file langsung didownload saat dibuka
 * @param {string} publicId 
 * @param {string} resource_type 
 * @param {number|string} version 
 * @returns {string} URL Cloudinary dengan fl_attachment dan versi yang benar
 */
var generateAttachmentUrl = function generateAttachmentUrl(publicId) {
  var resource_type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'raw';
  var version = arguments.length > 2 ? arguments[2] : undefined;
  var options = {
    resource_type: resource_type,
    transformation: [{
      flags: 'attachment'
    }]
  };
  if (version) options.version = version;
  return _cloudinary["default"].url(publicId, options);
};
var _default = exports["default"] = {
  uploadToCloudinary: uploadToCloudinary,
  deleteFromCloudinary: deleteFromCloudinary,
  generateAttachmentUrl: generateAttachmentUrl
};