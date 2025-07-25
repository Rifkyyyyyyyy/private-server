"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateUserValidation = exports.registerValidation = exports.loginValidation = void 0;
var _joi = _interopRequireDefault(require("joi"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var registerValidation = exports.registerValidation = _joi["default"].object({
  name: _joi["default"].string().min(3).max(100).required().messages({
    'string.empty': 'Nama tidak boleh kosong',
    'string.min': 'Nama minimal 3 karakter',
    'string.max': 'Nama maksimal 100 karakter',
    'any.required': 'Nama wajib diisi'
  }),
  email: _joi["default"].string().email().required().messages({
    'string.email': 'Format email tidak valid',
    'string.empty': 'Email tidak boleh kosong',
    'any.required': 'Email wajib diisi'
  }),
  password: _joi["default"].string().min(6).required().messages({
    'string.min': 'Password minimal 6 karakter',
    'string.empty': 'Password tidak boleh kosong',
    'any.required': 'Password wajib diisi'
  })
});
var loginValidation = exports.loginValidation = _joi["default"].object({
  email: _joi["default"].string().email().required().messages({
    'string.email': 'Format email tidak valid',
    'string.empty': 'Email tidak boleh kosong',
    'any.required': 'Email wajib diisi'
  }),
  password: _joi["default"].string().required().messages({
    'string.empty': 'Password tidak boleh kosong',
    'any.required': 'Password wajib diisi'
  })
});
var updateUserValidation = exports.updateUserValidation = _joi["default"].object({
  email: _joi["default"].string().email().optional().messages({
    'string.email': 'Format email tidak valid'
  }),
  password: _joi["default"].string().min(6).optional().messages({
    'string.min': 'Password minimal 6 karakter'
  }),
  name: _joi["default"].string().min(3).max(100).optional().messages({
    'string.min': 'Nama minimal 3 karakter',
    'string.max': 'Nama maksimal 100 karakter'
  }),
  about: _joi["default"].string().allow('').optional(),
  // allow empty string
  profilePhoto: _joi["default"].object({
    url: _joi["default"].string().uri().required(),
    publicId: _joi["default"].string().required()
  }).optional()
});