import Joi from 'joi';

export const registerValidation = Joi.object({
  name: Joi.string().min(3).max(100).required().messages({
    'string.empty': 'Nama tidak boleh kosong',
    'string.min': 'Nama minimal 3 karakter',
    'string.max': 'Nama maksimal 100 karakter',
    'any.required': 'Nama wajib diisi',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Format email tidak valid',
    'string.empty': 'Email tidak boleh kosong',
    'any.required': 'Email wajib diisi',
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Password minimal 6 karakter',
    'string.empty': 'Password tidak boleh kosong',
    'any.required': 'Password wajib diisi',
  }),
});

export const loginValidation = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Format email tidak valid',
    'string.empty': 'Email tidak boleh kosong',
    'any.required': 'Email wajib diisi',
  }),
  password: Joi.string().required().messages({
    'string.empty': 'Password tidak boleh kosong',
    'any.required': 'Password wajib diisi',
  }),
});



export const updateUserValidation = Joi.object({
  email: Joi.string().email().optional().messages({
    'string.email': 'Format email tidak valid',
  }),
  password: Joi.string().min(6).optional().messages({
    'string.min': 'Password minimal 6 karakter',
  }),
  name: Joi.string().min(3).max(100).optional().messages({
    'string.min': 'Nama minimal 3 karakter',
    'string.max': 'Nama maksimal 100 karakter',
  }),
  about: Joi.string().allow('').optional(), // allow empty string
  profilePhoto: Joi.object({
    url: Joi.string().uri().required(),
    publicId: Joi.string().required(),
  }).optional(),
});

