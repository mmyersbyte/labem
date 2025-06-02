import logger from '../utils/logger.js';

// Middleware global para tratamento de erros
export default function errorHandler(err, req, res, next) {
  // Registra o erro com detalhes no logger
  logger.error(`[${req.method}] ${req.originalUrl} - ${err.message}`, {
    stack: err.stack,
  });

  // Retorna resposta de erro para o cliente
  res.status(err.status || 500).json({
    error: err.message || 'Erro interno do servidor',
  });
}
