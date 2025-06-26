import rateLimit, { RateLimitRequestHandler } from 'express-rate-limit';

// Configurações do rate limiter
interface RateLimiterConfig {
  windowMs: number;
  max: number;
  message: {
    error: string;
    retryAfter: string;
  };
  standardHeaders: boolean;
  legacyHeaders: boolean;
}

// Configuração centralizada
const RATE_LIMIT_CONFIG: RateLimiterConfig = {
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
export const limiter: RateLimitRequestHandler = rateLimit(RATE_LIMIT_CONFIG);
