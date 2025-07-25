"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.educationValidation = void 0;
var _joi = _interopRequireDefault(require("joi"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var educationValidation = exports.educationValidation = _joi["default"].object({
  institution: _joi["default"].string().min(1).required().messages({
    'string.empty': 'Nama institusi tidak boleh kosong',
    'any.required': 'Institusi wajib diisi'
  }),
  program: _joi["default"].string().allow('', null).messages({
    'string.base': 'Program harus berupa teks'
  }),
  degree: _joi["default"].string().allow('', null).messages({
    'string.base': 'Gelar harus berupa teks'
  }),
  educationType: _joi["default"].string().valid('FORMAL', 'NON_DEGREE', 'TRAINING').required().messages({
    'any.only': 'Jenis pendidikan hanya boleh FORMAL, NON_DEGREE, atau TRAINING',
    'any.required': 'Tipe pendidikan wajib diisi'
  }),
  location: _joi["default"].string().allow('', null).messages({
    'string.base': 'Lokasi harus berupa teks'
  }),
  startDate: _joi["default"].date().required().messages({
    'date.base': 'Tanggal mulai harus berupa tanggal yang valid',
    'any.required': 'Tanggal mulai wajib diisi'
  }),
  endDate: _joi["default"].date().allow(null).messages({
    'date.base': 'Tanggal selesai harus berupa tanggal yang valid'
  }),
  description: _joi["default"].string().allow('', null).messages({
    'string.base': 'Deskripsi harus berupa teks'
  })
});