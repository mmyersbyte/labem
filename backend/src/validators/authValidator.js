import Joi from 'joi';

// Schema de validação para login (admin e user comum)
export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.empty': 'E-mail é obrigatório.',
    'any.required': 'E-mail é obrigatório.',
    'string.email': 'E-mail inválido.',
  }),
  password: Joi.string().required().messages({
    'string.empty': 'Senha é obrigatória.',
    'any.required': 'Senha é obrigatória.',
  }),
});
