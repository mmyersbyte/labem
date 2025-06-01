import Joi from 'joi';

// Schema de validação para envio de mensagem de contato
export const contactSchema = Joi.object({
  nome: Joi.string().min(2).max(100).required().messages({
    'string.empty': 'Nome é obrigatório.',
    'any.required': 'Nome é obrigatório.',
    'string.min': 'Nome deve ter pelo menos 2 caracteres.',
    'string.max': 'Nome deve ter no máximo 100 caracteres.',
  }),
  email: Joi.string().email().required().messages({
    'string.empty': 'E-mail é obrigatório.',
    'any.required': 'E-mail é obrigatório.',
    'string.email': 'E-mail inválido.',
  }),
  assunto: Joi.string().min(2).max(150).required().messages({
    'string.empty': 'Assunto é obrigatório.',
    'any.required': 'Assunto é obrigatório.',
    'string.min': 'Assunto deve ter pelo menos 2 caracteres.',
    'string.max': 'Assunto deve ter no máximo 150 caracteres.',
  }),
  mensagem: Joi.string().min(5).max(2000).required().messages({
    'string.empty': 'Mensagem é obrigatória.',
    'any.required': 'Mensagem é obrigatória.',
    'string.min': 'Mensagem deve ter pelo menos 5 caracteres.',
    'string.max': 'Mensagem deve ter no máximo 2000 caracteres.',
  }),
});
