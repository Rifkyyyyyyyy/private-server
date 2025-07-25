import Joi from 'joi';

export const programmingLanguageValidation = Joi.object({
  name: Joi.string().min(1).max(100).required().messages({
    'string.empty': 'Nama bahasa pemrograman tidak boleh kosong',
    'string.min': 'Nama bahasa pemrograman minimal 1 karakter',
    'string.max': 'Nama bahasa pemrograman maksimal 100 karakter',
    'any.required': 'Nama bahasa pemrograman wajib diisi',
  }),
  experience: Joi.number().integer().min(1).required().messages({
    'number.base': 'Pengalaman harus berupa angka',
    'number.integer': 'Pengalaman harus bilangan bulat',
    'number.min': 'Pengalaman tidak boleh negatif',
    'any.required': 'Pengalaman wajib diisi',
  }),
  experienceType: Joi.string().valid('MONTH', 'YEAR').required().messages({
    'any.only': 'Tipe pengalaman hanya boleh MONTH atau YEAR',
    'any.required': 'Tipe pengalaman wajib diisi',
  }),
});

