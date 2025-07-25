import Joi from 'joi';

export const blogValidation = Joi.object({
  title: Joi.string().trim().required().messages({
    'string.empty': 'Judul proyek wajib diisi',
    'any.required': 'Judul proyek wajib diisi',
  }),

  slug: Joi.string().trim().required().messages({
    'string.empty': 'Slug proyek wajib diisi',
    'any.required': 'Slug proyek wajib diisi',
  }),

  summary: Joi.string().trim().allow('').optional().messages({
    'string.base': 'Summary harus berupa teks',
  }),

  cover: Joi.object({
    url: Joi.string().uri().required().messages({
      'string.uri': 'URL cover harus berupa URL yang valid',
      'any.required': 'URL cover wajib diisi',
    }),
    publicId: Joi.string().trim().required().messages({
      'string.empty': 'publicId cover wajib diisi',
      'any.required': 'publicId cover wajib diisi',
    }),
  }).unknown(false),

  detail: Joi.object({
    title: Joi.string().trim().required().messages({
      'string.empty': 'Judul detail proyek wajib diisi',
      'any.required': 'Judul detail proyek wajib diisi',
    }),

    contentHtml: Joi.string().trim().required().messages({
      'string.empty': 'Konten detail wajib diisi',
      'any.required': 'Konten detail wajib diisi',
    }),

    thumbnail: Joi.object({
      url: Joi.string().uri().required().messages({
        'string.uri': 'URL thumbnail harus berupa URL yang valid',
        'any.required': 'URL thumbnail wajib diisi',
      }),
      publicId: Joi.string().trim().required().messages({
        'string.empty': 'publicId thumbnail wajib diisi',
        'any.required': 'publicId thumbnail wajib diisi',
      }),
    }).unknown(false),
  }).unknown(false),
}).unknown(false);
