import Joi from 'joi';

export const projectValidation = Joi.object({
  title: Joi.string().trim().required().messages({
    'string.empty': 'Judul proyek wajib diisi',
    'any.required': 'Judul proyek wajib diisi',
  }),

  description: Joi.string().trim().required().messages({
    'string.empty': 'Deskripsi proyek wajib diisi',
    'any.required': 'Deskripsi proyek wajib diisi',
  }),

  tags: Joi.array().items(Joi.string().trim()).default([]).messages({
    'array.base': 'Tags harus berupa array string',
  }),

  detail: Joi.object({
    title: Joi.string().trim().required().messages({
      'string.empty': 'Judul detail proyek wajib diisi',
      'any.required': 'Judul detail proyek wajib diisi',
    }),

    contentHtml: Joi.string().trim().required().messages({
      'string.empty': 'Konten detail wajib diisi',
      'any.required': 'Konten detail wajib diisi',
    }),

    status: Joi.string()
      .valid('DRAFT', 'PUBLISHED', 'ARCHIVED')
      .default('PUBLISHED')
      .messages({
        'any.only': 'Status harus DRAFT, PUBLISHED, atau ARCHIVED',
      }),

    repository: Joi.string()
      .uri()
      .allow('', null)
      .messages({
        'string.uri': 'Repository harus berupa URL valid',
      }),

      banners: Joi.array()
      .items(
        Joi.object({
          url: Joi.string().uri().required().messages({
            'string.uri': 'URL banner harus berupa URL yang valid',
            'any.required': 'URL banner wajib diisi',
          }),
          publicId: Joi.string().trim().required().messages({
            'string.empty': 'publicId banner wajib diisi',
            'any.required': 'publicId banner wajib diisi',
          }),
        })
      )
      .min(1)
      .required()
      .messages({
        'array.min': 'Setidaknya harus ada 1 banner',
        'any.required': 'Field banners wajib diisi',
      }),
    
  }).optional().unknown(false), // ❗ mencegah field liar di detail
}).unknown(false); // ❗ mencegah field liar di root


