"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.certificateValidation = void 0;
var _joi = _interopRequireDefault(require("joi"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var certificateValidation = exports.certificateValidation = _joi["default"].object({
  title: _joi["default"].string().trim().min(3).max(100).required().messages({
    'string.empty': 'Judul sertifikat tidak boleh kosong',
    'string.min': 'Judul sertifikat minimal 3 karakter',
    'string.max': 'Judul sertifikat maksimal 100 karakter',
    'any.required': 'Judul sertifikat wajib diisi'
  }),
  description: _joi["default"].string().allow('', null).max(1000).messages({
    'string.max': 'Deskripsi maksimal 1000 karakter'
  }),
  details: _joi["default"].string().allow('', null).max(1000).messages({
    'string.max': 'Detail maksimal 1000 karakter'
  }),
  fileJson: _joi["default"].object({
    publicId: _joi["default"].string().required().messages({
      'any.required': 'File sertifikat wajib diupload',
      'string.empty': 'File sertifikat tidak boleh kosong'
    }),
    fileUrl: _joi["default"].string().uri().required().messages({
      'string.uri': 'URL file tidak valid',
      'any.required': 'URL file sertifikat wajib diisi'
    })
  }).required().messages({
    'object.base': 'File sertifikat tidak valid',
    'any.required': 'File sertifikat wajib diisi'
  }),
  viewJson: _joi["default"].object({
    publicId: _joi["default"].string().required().messages({
      'any.required': 'View file harus memiliki publicId',
      'string.empty': 'publicId tidak boleh kosong'
    }),
    fileUrl: _joi["default"].string().uri().required().messages({
      'string.uri': 'URL view tidak valid',
      'any.required': 'URL view wajib diisi'
    })
  }).required().messages({
    'object.base': 'View sertifikat tidak valid',
    'any.required': 'View sertifikat wajib diisi'
  })
});