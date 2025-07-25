"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.programmingLanguageValidation = void 0;
var _joi = _interopRequireDefault(require("joi"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var programmingLanguageValidation = exports.programmingLanguageValidation = _joi["default"].object({
  name: _joi["default"].string().min(1).max(100).required().messages({
    'string.empty': 'Nama bahasa pemrograman tidak boleh kosong',
    'string.min': 'Nama bahasa pemrograman minimal 1 karakter',
    'string.max': 'Nama bahasa pemrograman maksimal 100 karakter',
    'any.required': 'Nama bahasa pemrograman wajib diisi'
  }),
  experience: _joi["default"].number().integer().min(1).required().messages({
    'number.base': 'Pengalaman harus berupa angka',
    'number.integer': 'Pengalaman harus bilangan bulat',
    'number.min': 'Pengalaman tidak boleh negatif',
    'any.required': 'Pengalaman wajib diisi'
  }),
  experienceType: _joi["default"].string().valid('MONTH', 'YEAR').required().messages({
    'any.only': 'Tipe pengalaman hanya boleh MONTH atau YEAR',
    'any.required': 'Tipe pengalaman wajib diisi'
  })
});