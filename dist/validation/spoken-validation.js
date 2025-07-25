"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.spokenLanguageValidation = void 0;
var _joi = _interopRequireDefault(require("joi"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var spokenLanguageValidation = exports.spokenLanguageValidation = _joi["default"].object({
  name: _joi["default"].string().required().messages({
    'any.required': 'Nama bahasa harus diisi',
    'string.base': 'Nama bahasa harus berupa teks',
    'string.empty': 'Nama bahasa tidak boleh kosong'
  }),
  level: _joi["default"].string().valid('BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'FLUENT', 'NATIVE').required().messages({
    'any.required': 'Tingkat kemampuan bahasa harus diisi',
    'any.only': 'Level hanya boleh BEGINNER, INTERMEDIATE, ADVANCED, FLUENT, atau NATIVE'
  })
});