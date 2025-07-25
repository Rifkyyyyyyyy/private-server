import Joi from 'joi'

export const spokenLanguageValidation = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'Nama bahasa harus diisi',
    'string.base': 'Nama bahasa harus berupa teks',
    'string.empty': 'Nama bahasa tidak boleh kosong',
  }),
  level: Joi.string()
    .valid('BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'FLUENT', 'NATIVE')
    .required()
    .messages({
      'any.required': 'Tingkat kemampuan bahasa harus diisi',
      'any.only': 'Level hanya boleh BEGINNER, INTERMEDIATE, ADVANCED, FLUENT, atau NATIVE',
    }),
});

