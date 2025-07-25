"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.blogValidation = void 0;
var _joi = _interopRequireDefault(require("joi"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var blogValidation = exports.blogValidation = _joi["default"].object({
  title: _joi["default"].string().trim().required().messages({
    'string.empty': 'Judul proyek wajib diisi',
    'any.required': 'Judul proyek wajib diisi'
  }),
  slug: _joi["default"].string().trim().required().messages({
    'string.empty': 'Slug proyek wajib diisi',
    'any.required': 'Slug proyek wajib diisi'
  }),
  summary: _joi["default"].string().trim().allow('').optional().messages({
    'string.base': 'Summary harus berupa teks'
  }),
  cover: _joi["default"].object({
    url: _joi["default"].string().uri().required().messages({
      'string.uri': 'URL cover harus berupa URL yang valid',
      'any.required': 'URL cover wajib diisi'
    }),
    publicId: _joi["default"].string().trim().required().messages({
      'string.empty': 'publicId cover wajib diisi',
      'any.required': 'publicId cover wajib diisi'
    })
  }).unknown(false),
  detail: _joi["default"].object({
    title: _joi["default"].string().trim().required().messages({
      'string.empty': 'Judul detail proyek wajib diisi',
      'any.required': 'Judul detail proyek wajib diisi'
    }),
    contentHtml: _joi["default"].string().trim().required().messages({
      'string.empty': 'Konten detail wajib diisi',
      'any.required': 'Konten detail wajib diisi'
    }),
    thumbnail: _joi["default"].object({
      url: _joi["default"].string().uri().required().messages({
        'string.uri': 'URL thumbnail harus berupa URL yang valid',
        'any.required': 'URL thumbnail wajib diisi'
      }),
      publicId: _joi["default"].string().trim().required().messages({
        'string.empty': 'publicId thumbnail wajib diisi',
        'any.required': 'publicId thumbnail wajib diisi'
      })
    }).unknown(false)
  }).unknown(false)
}).unknown(false);