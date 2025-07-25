"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.techStackValidation = void 0;
var _joi = _interopRequireDefault(require("joi"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var techStackValidation = exports.techStackValidation = _joi["default"].object({
  name: _joi["default"].string().min(1).max(50).required().messages({
    'string.empty': 'Nama tech stack tidak boleh kosong',
    'string.min': 'Nama tech stack minimal 2 karakter',
    'string.max': 'Nama tech stack maksimal 50 karakter',
    'any.required': 'Nama tech stack wajib diisi'
  }),
  category: _joi["default"].string().max(50).allow(null, '').optional().messages({
    'string.max': 'Kategori maksimal 50 karakter'
  })
});