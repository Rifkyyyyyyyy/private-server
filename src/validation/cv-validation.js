import Joi from 'joi';

export const cvsValidation = Joi.object({
  title: Joi.string().min(3).required().messages({
    'string.empty': 'Judul CV tidak boleh kosong',
    'string.min': 'Judul CV minimal 3 karakter',
    'any.required': 'Judul CV wajib diisi',
  }),
  description: Joi.string().allow('', null).messages({
    'string.base': 'Deskripsi harus berupa teks',
  }),
  fileJson: Joi.object({
    publicId: Joi.string().required().messages({
      'string.empty': 'PublicId harus diisi',
      'any.required': 'PublicId wajib diisi',
    }),
    fileUrl: Joi.string().uri().required().messages({
      'string.empty': 'File URL harus diisi',
      'string.uri': 'File URL harus valid',
      'any.required': 'File URL wajib diisi',
    }),
  }).required().messages({
    'any.required': 'File CV wajib diunggah',
    'object.base': 'File CV harus berupa objek yang valid',
  }),
  category: Joi.string()
    .valid(
      'MOBILE_DEVELOPER',
      'FULLSTACK_DEVELOPER',
      'BACKEND_DEVELOPER',
      'WEB_DEVELOPER',
      'AI_ENGINEER',
      'VIDEO_EDITOR',
      'UI_UX_DESIGNER',
      'DATA_ANALYST',
      'OTHER'
    )
    .required()
    .messages({
      'any.only': 'Kategori CV tidak valid',
      'any.required': 'Kategori CV wajib diisi',
    }),
});
