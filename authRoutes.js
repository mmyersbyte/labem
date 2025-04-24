// authRoutes.js
require('dotenv').config();

const express = require('express');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const { Pool } = require('pg');

const router = express.Router();

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
  getUserByEmail: 'SELECT * FROM usuarios WHERE email = $1',
};

// Cache de usuários para evitar consultas repetidas
const userCache = new Map();

// Rota POST para login otimizada
router.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  try {
    // Verifica se o usuário está em cache
    if (userCache.has(email)) {
      const usuario = userCache.get(email);
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
    }

    // Busca o usuário no banco de dados pelo email
    const result = await pool.query(SQL_QUERIES.getUserByEmail, [email]);

    if (result.rows.length === 0) {
      console.log('Usuário não encontrado:', email);
      return res.status(401).json({ error: 'Email ou senha incorretos' });
    }

    const usuario = result.rows[0];
    console.log('Usuário encontrado:', usuario);

    // Armazena o usuário em cache
    userCache.set(email, usuario);

    // Compara a senha fornecida com o hash armazenado no banco
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    console.log('Senha válida:', senhaValida);

    if (!senhaValida) {
      console.log('Senha incorreta para o usuário:', email);
      return res.status(401).json({ error: 'Email ou senha incorretos' });
    }

    // Gera um token JWT válido por 1 hora
    const token = jwt.sign(
      { id: usuario.id, email: usuario.email },
      JWT_CONFIG.secret,
      { expiresIn: JWT_CONFIG.expiresIn }
    );

    // Retorna o token para o cliente
    res.status(200).json({ success: true, message: 'Login realizado!', token });
  } catch (err) {
    console.error('Erro no login:', err);
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
