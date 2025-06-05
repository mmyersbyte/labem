import Joi from 'joi';

const noScriptsRegex = /^[^<>$"']*$/; // proíbe <, >, ", ', $

export const loginSchema = Joi.object({
  email: Joi.string().email().pattern(noScriptsRegex).required().messages({
    'string.empty': 'E-mail é obrigatório.',
    'any.required': 'E-mail é obrigatório.',
    'string.email': 'E-mail inválido.',
    'string.pattern.base': 'E-mail contém caracteres não permitidos.',
  }),

  password: Joi.string()
    .min(6)
    .max(100)
    .pattern(noScriptsRegex)
    .required()
    .messages({
      'string.empty': 'Senha é obrigatória.',
      'any.required': 'Senha é obrigatória.',
      'string.min': 'Senha deve ter no mínimo 6 caracteres.',
      'string.max': 'Senha muito longa.',
      'string.pattern.base': 'Senha contém caracteres não permitidos.',
    }),
});
