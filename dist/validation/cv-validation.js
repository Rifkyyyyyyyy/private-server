"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cvsValidation = void 0;
var _joi = _interopRequireDefault(require("joi"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var cvsValidation = exports.cvsValidation = _joi["default"].object({
  title: _joi["default"].string().min(3).required().messages({
    'string.empty': 'Judul CV tidak boleh kosong',
    'string.min': 'Judul CV minimal 3 karakter',
    'any.required': 'Judul CV wajib diisi'
  }),
  description: _joi["default"].string().allow('', null).messages({
    'string.base': 'Deskripsi harus berupa teks'
  }),
  fileJson: _joi["default"].object({
    publicId: _joi["default"].string().required().messages({
      'string.empty': 'PublicId harus diisi',
      'any.required': 'PublicId wajib diisi'
    }),
    fileUrl: _joi["default"].string().uri().required().messages({
      'string.empty': 'File URL harus diisi',
      'string.uri': 'File URL harus valid',
      'any.required': 'File URL wajib diisi'
    })
  }).required().messages({
    'any.required': 'File CV wajib diunggah',
    'object.base': 'File CV harus berupa objek yang valid'
  }),
  category: _joi["default"].string().valid('MOBILE_DEVELOPER', 'FULLSTACK_DEVELOPER', 'BACKEND_DEVELOPER', 'WEB_DEVELOPER', 'AI_ENGINEER', 'VIDEO_EDITOR', 'UI_UX_DESIGNER', 'DATA_ANALYST', 'OTHER').required().messages({
    'any.only': 'Kategori CV tidak valid',
    'any.required': 'Kategori CV wajib diisi'
  })
});