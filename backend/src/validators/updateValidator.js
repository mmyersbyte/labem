import Joi from 'joi';

// Schema de validação para criação de atualização (update)
export const updateSchema = Joi.object({
  icone: Joi.string().min(1).max(100).required().messages({
    'string.empty': 'Ícone é obrigatório.',
    'any.required': 'Ícone é obrigatório.',
    'string.min': 'Ícone deve ter pelo menos 1 caractere.',
    'string.max': 'Ícone deve ter no máximo 100 caracteres.',
  }),
  titulo: Joi.string().min(2).max(150).required().messages({
    'string.empty': 'Título é obrigatório.',
    'any.required': 'Título é obrigatório.',
    'string.min': 'Título deve ter pelo menos 2 caracteres.',
    'string.max': 'Título deve ter no máximo 150 caracteres.',
  }),
  paragrafo: Joi.string().min(5).max(2000).required().messages({
    'string.empty': 'Parágrafo é obrigatório.',
    'any.required': 'Parágrafo é obrigatório.',
    'string.min': 'Parágrafo deve ter pelo menos 5 caracteres.',
    'string.max': 'Parágrafo deve ter no máximo 2000 caracteres.',
  }),
});
