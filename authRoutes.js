// authRoutes.js
require('dotenv').config();

const express = require('express');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const { Pool } = require('pg');

const router = express.Router();

// Configuração do pool para conectar ao banco de dados Neon
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const JWT_SECRET = process.env.JWT_SECRET;

// Rota POST para login
router.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  try {
    // Busca o usuário no banco de dados pelo email
    const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [
      email,
    ]);

    if (result.rows.length === 0) {
      console.log('Usuário não encontrado:', email);
      return res.status(401).json({ error: 'Email ou senha incorretos' });
    }

    const usuario = result.rows[0];
    console.log('Usuário encontrado:', usuario);

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
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Retorna o token para o cliente
    res.status(200).json({ success: true, message: 'Login realizado!', token });
  } catch (err) {
    console.error('Erro no login:', err);
    res.status(500).json({ error: 'Erro no servidor' });
  }
});

// Middleware para proteger rotas usando JWT
function authenticateToken(req, res, next) {
  // O token deve ser enviado no header 'Authorization' no formato: Bearer <token>
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401); // Não autorizado se não houver token
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403); // Token inválido ou expirado
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
