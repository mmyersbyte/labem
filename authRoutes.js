// authRoutes.js
require('dotenv').config();

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');

const router = express.Router();

// Configuração de segurança básica
router.use(helmet());
router.use(xss());

// Configuração de rate limiting
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // 5 tentativas por IP
  message: { error: 'Muitas tentativas de login. Tente novamente mais tarde.' },
});

// Configuração otimizada do pool para conectar ao banco de dados Neon
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  max: 20, // Limite máximo de conexões
  idleTimeoutMillis: 30000, // Tempo máximo de inatividade
  connectionTimeoutMillis: 2000, // Tempo máximo para estabelecer conexão
});

// Cache de configurações JWT
const JWT_CONFIG = {
  secret: process.env.JWT_SECRET,
  expiresIn: '1h',
};

// Cache de consultas SQL
const SQL_QUERIES = {
  getUserByEmail: 'SELECT id, email, senha FROM usuarios WHERE email = $1',
};

// Cache de usuários com expiração
const userCache = new Map();
const CACHE_EXPIRATION = 5 * 60 * 1000; // 5 minutos

// Função para sanitizar email
function sanitizeEmail(email) {
  return email.toLowerCase().trim();
}

// Função para validar força da senha
function validatePasswordStrength(senha) {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(senha);
  const hasLowerCase = /[a-z]/.test(senha);
  const hasNumbers = /\d/.test(senha);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(senha);

  return (
    senha.length >= minLength &&
    hasUpperCase &&
    hasLowerCase &&
    hasNumbers &&
    hasSpecialChar
  );
}

// Rota POST para login otimizada e segura
router.post('/login', loginLimiter, async (req, res) => {
  const { email, senha } = req.body;

  // Validação básica
  if (!email || !senha) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios' });
  }

  // Sanitização
  const sanitizedEmail = sanitizeEmail(email);

  try {
    // Verifica se o usuário está em cache e se o cache ainda é válido
    if (userCache.has(sanitizedEmail)) {
      const cachedData = userCache.get(sanitizedEmail);
      if (Date.now() - cachedData.timestamp < CACHE_EXPIRATION) {
        const usuario = cachedData.user;
        const senhaValida = await bcrypt.compare(senha, usuario.senha);

        if (senhaValida) {
          const token = jwt.sign(
            { id: usuario.id, email: usuario.email },
            JWT_CONFIG.secret,
            { expiresIn: JWT_CONFIG.expiresIn }
          );
          return res
            .status(200)
            .json({ success: true, message: 'Login realizado!', token });
        }
      } else {
        userCache.delete(sanitizedEmail);
      }
    }

    // Busca o usuário no banco de dados
    const result = await pool.query(SQL_QUERIES.getUserByEmail, [
      sanitizedEmail,
    ]);

    if (result.rows.length === 0) {
      // Log seguro sem expor dados sensíveis
      console.log('Tentativa de login falha - usuário não encontrado');
      return res.status(401).json({ error: 'Email ou senha incorretos' });
    }

    const usuario = result.rows[0];

    // Armazena no cache com timestamp
    userCache.set(sanitizedEmail, {
      user: usuario,
      timestamp: Date.now(),
    });

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      console.log('Tentativa de login falha - senha incorreta');
      return res.status(401).json({ error: 'Email ou senha incorretos' });
    }

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email },
      JWT_CONFIG.secret,
      { expiresIn: JWT_CONFIG.expiresIn }
    );

    res.status(200).json({ success: true, message: 'Login realizado!', token });
  } catch (err) {
    console.error('Erro no login:', err.message);
    res.status(500).json({ error: 'Erro no servidor' });
  }
});

// Middleware para proteger rotas usando JWT otimizado
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, JWT_CONFIG.secret, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
}

// Rota protegida de exemplo que retorna um conteúdo secreto
router.get('/secreta', authenticateToken, (req, res) => {
  res.status(200).json({ message: 'Bem-vindo à página secreta!' });
});

module.exports = {
  router,
  authenticateToken,
};
