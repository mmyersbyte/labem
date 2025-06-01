// Função middleware para validar o corpo da requisição (req.body)
// Recebe um schema Joi como parâmetro
export function validateBody(schema) {
  // Retorna uma função middleware padrão do Express
  return (req, res, next) => {
    // Valida o corpo da requisição usando o schema Joi
    const { error } = schema.validate(req.body);
    // Se houver erro de validação
    if (error) {
      // Retorna status 400 (Bad Request) e a mensagem de erro
      return res.status(400).json({ message: error.details[0].message });
    }
    // Se não houver erro, segue para o próximo middleware/controller
    next();
  };
}
