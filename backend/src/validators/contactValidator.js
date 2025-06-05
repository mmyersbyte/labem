import Joi from 'joi';

const safeString = /^[^<>$"'`]*$/; // bloqueia XSS e payloads perigosos

export const contactSchema = Joi.object({
  nome: Joi.string()
    .min(2)
    .max(100)
    .pattern(safeString)
    .trim()
    .required()
    .messages({
      'string.empty': 'Nome é obrigatório.',
      'any.required': 'Nome é obrigatório.',
      'string.min': 'Nome deve ter pelo menos 2 caracteres.',
      'string.max': 'Nome deve ter no máximo 100 caracteres.',
      'string.pattern.base': 'Nome contém caracteres não permitidos.',
    }),
  email: Joi.string().email().pattern(safeString).trim().required().messages({
    'string.empty': 'E-mail é obrigatório.',
    'any.required': 'E-mail é obrigatório.',
    'string.email': 'E-mail inválido.',
    'string.pattern.base': 'E-mail contém caracteres não permitidos.',
  }),
  assunto: Joi.string()
    .min(2)
    .max(150)
    .pattern(safeString)
    .trim()
    .required()
    .messages({
      'string.empty': 'Assunto é obrigatório.',
      'any.required': 'Assunto é obrigatório.',
      'string.min': 'Assunto deve ter pelo menos 2 caracteres.',
      'string.max': 'Assunto deve ter no máximo 150 caracteres.',
      'string.pattern.base': 'Assunto contém caracteres não permitidos.',
    }),
  mensagem: Joi.string()
    .min(5)
    .max(2000)
    .pattern(safeString)
    .trim()
    .required()
    .messages({
      'string.empty': 'Mensagem é obrigatória.',
      'any.required': 'Mensagem é obrigatória.',
      'string.min': 'Mensagem deve ter pelo menos 5 caracteres.',
      'string.max': 'Mensagem deve ter no máximo 2000 caracteres.',
      'string.pattern.base': 'Mensagem contém caracteres não permitidos.',
    }),
});
