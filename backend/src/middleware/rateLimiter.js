import rateLimit from 'express-rate-limit';

// Configuração centralizada
const RATE_LIMIT_CONFIG = {
  windowMs: 15 * 60 * 1000, // 15 minutos em millisegundos
  max: 100, // Limite de 100 requisições por IP por janela
  message: {
    error: 'Tá fazendo muitas requisições, daqui 15min tente novamente.',
    retryAfter: '15 minutos',
  },
  standardHeaders: true, // Retorna rate limit info nos headers `RateLimit-*`
  legacyHeaders: false, // Desabilita headers `X-RateLimit-*`
};

/**
 * Middleware de rate limiting para proteger a API contra abuso
 * Limita requisições por IP em uma janela de tempo
 */
export const limiter = rateLimit(RATE_LIMIT_CONFIG);
