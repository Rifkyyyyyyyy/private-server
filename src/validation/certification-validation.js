import Joi from 'joi';

export const certificateValidation = Joi.object({
  title: Joi.string().trim().min(3).max(100).required().messages({
    'string.empty': 'Judul sertifikat tidak boleh kosong',
    'string.min': 'Judul sertifikat minimal 3 karakter',
    'string.max': 'Judul sertifikat maksimal 100 karakter',
    'any.required': 'Judul sertifikat wajib diisi',
  }),
  description: Joi.string().allow('', null).max(1000).messages({
    'string.max': 'Deskripsi maksimal 1000 karakter',
  }),
  details: Joi.string().allow('', null).max(1000).messages({
    'string.max': 'Detail maksimal 1000 karakter',
  }),
  fileJson: Joi.object({
    publicId: Joi.string().required().messages({
      'any.required': 'File sertifikat wajib diupload',
      'string.empty': 'File sertifikat tidak boleh kosong',
    }),
    fileUrl: Joi.string().uri().required().messages({
      'string.uri': 'URL file tidak valid',
      'any.required': 'URL file sertifikat wajib diisi',
    }),
  }).required().messages({
    'object.base': 'File sertifikat tidak valid',
    'any.required': 'File sertifikat wajib diisi',
  }),
  viewJson: Joi.object({
    publicId: Joi.string().required().messages({
      'any.required': 'View file harus memiliki publicId',
      'string.empty': 'publicId tidak boleh kosong',
    }),
    fileUrl: Joi.string().uri().required().messages({
      'string.uri': 'URL view tidak valid',
      'any.required': 'URL view wajib diisi',
    }),
  }).required().messages({
    'object.base': 'View sertifikat tidak valid',
    'any.required': 'View sertifikat wajib diisi',
  }),
});
