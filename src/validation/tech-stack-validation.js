import Joi from 'joi';

export const techStackValidation = Joi.object({
  name: Joi.string().min(1).max(50).required().messages({
    'string.empty': 'Nama tech stack tidak boleh kosong',
    'string.min': 'Nama tech stack minimal 2 karakter',
    'string.max': 'Nama tech stack maksimal 50 karakter',
    'any.required': 'Nama tech stack wajib diisi',
  }),
  category: Joi.string().max(50).allow(null, '').optional().messages({
    'string.max': 'Kategori maksimal 50 karakter',
  }),
});
