// Logger configurado com Winston para registrar logs no console e em arquivos
import { createLogger, format, transports } from 'winston';

// Cria e exporta o logger com formatos e destinos definidos
const logger = createLogger({
  level: 'info', // Nível mínimo de log
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Adiciona data/hora
    format.errors({ stack: true }), // Inclui stack trace em erros
    format.splat(),
    format.json() // Formato JSON para persistência
  ),
  transports: [
    new transports.Console({ format: format.simple() }), // Exibe logs no console
    new transports.File({ filename: 'logs/error.log', level: 'error' }), // Salva erros em arquivo
    new transports.File({ filename: 'logs/combined.log' }), // Salva todos os logs
  ],
});

export default logger;
