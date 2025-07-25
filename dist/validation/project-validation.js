"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.projectValidation = void 0;
var _joi = _interopRequireDefault(require("joi"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var projectValidation = exports.projectValidation = _joi["default"].object({
  title: _joi["default"].string().trim().required().messages({
    'string.empty': 'Judul proyek wajib diisi',
    'any.required': 'Judul proyek wajib diisi'
  }),
  description: _joi["default"].string().trim().required().messages({
    'string.empty': 'Deskripsi proyek wajib diisi',
    'any.required': 'Deskripsi proyek wajib diisi'
  }),
  tags: _joi["default"].array().items(_joi["default"].string().trim())["default"]([]).messages({
    'array.base': 'Tags harus berupa array string'
  }),
  detail: _joi["default"].object({
    title: _joi["default"].string().trim().required().messages({
      'string.empty': 'Judul detail proyek wajib diisi',
      'any.required': 'Judul detail proyek wajib diisi'
    }),
    contentHtml: _joi["default"].string().trim().required().messages({
      'string.empty': 'Konten detail wajib diisi',
      'any.required': 'Konten detail wajib diisi'
    }),
    status: _joi["default"].string().valid('DRAFT', 'PUBLISHED', 'ARCHIVED')["default"]('PUBLISHED').messages({
      'any.only': 'Status harus DRAFT, PUBLISHED, atau ARCHIVED'
    }),
    repository: _joi["default"].string().uri().allow('', null).messages({
      'string.uri': 'Repository harus berupa URL valid'
    }),
    banners: _joi["default"].array().items(_joi["default"].object({
      url: _joi["default"].string().uri().required().messages({
        'string.uri': 'URL banner harus berupa URL yang valid',
        'any.required': 'URL banner wajib diisi'
      }),
      publicId: _joi["default"].string().trim().required().messages({
        'string.empty': 'publicId banner wajib diisi',
        'any.required': 'publicId banner wajib diisi'
      })
    })).min(1).required().messages({
      'array.min': 'Setidaknya harus ada 1 banner',
      'any.required': 'Field banners wajib diisi'
    })
  }).optional().unknown(false) // ❗ mencegah field liar di detail
}).unknown(false); // ❗ mencegah field liar di root