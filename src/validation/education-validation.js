import Joi from 'joi';

export const educationValidation = Joi.object({
  institution: Joi.string().min(1).required().messages({
    'string.empty': 'Nama institusi tidak boleh kosong',
    'any.required': 'Institusi wajib diisi',
  }),
  program: Joi.string().allow('', null).messages({
    'string.base': 'Program harus berupa teks',
  }),
  degree: Joi.string().allow('', null).messages({
    'string.base': 'Gelar harus berupa teks',
  }),
  educationType: Joi.string()
    .valid('FORMAL', 'NON_DEGREE', 'TRAINING')
    .required()
    .messages({
      'any.only': 'Jenis pendidikan hanya boleh FORMAL, NON_DEGREE, atau TRAINING',
      'any.required': 'Tipe pendidikan wajib diisi',
    }),
  location: Joi.string().allow('', null).messages({
    'string.base': 'Lokasi harus berupa teks',
  }),
  startDate: Joi.date().required().messages({
    'date.base': 'Tanggal mulai harus berupa tanggal yang valid',
    'any.required': 'Tanggal mulai wajib diisi',
  }),
  endDate: Joi.date().allow(null).messages({
    'date.base': 'Tanggal selesai harus berupa tanggal yang valid',
  }),
  description: Joi.string().allow('', null).messages({
    'string.base': 'Deskripsi harus berupa teks',
  }),
});
