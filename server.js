const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Configuração do CORS (Corrigida)
const allowedOrigins = [
  'http://127.0.0.1:5501', // Frontend local
  'https://labem.vercel.app' // Frontend no Vercel
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Origem não permitida pelo CORS'));
    }
  },
  methods: ['GET', 'POST'], // Métodos permitidos
  allowedHeaders: ['Content-Type'],
  credentials: true
}));

// Middleware para processar JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configuração do banco de dados Neon com Pool
const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_akCQIUW4Aw6v@ep-royal-pine-a89zrpwb-pooler.eastus2.azure.neon.tech/contatos_db?sslmode=require',
  ssl: { rejectUnauthorized: false },
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000
});

// Teste de conexão com o banco de dados
pool.query('SELECT 1', (err, result) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('Conectado ao banco de dados Neon');
  }
});

// Rota para lidar com requisições OPTIONS (preflight)
app.options('/contato', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.status(204).send(); // Resposta vazia, pois OPTIONS não precisa de conteúdo
});

// Rota para receber dados do formulário
app.post('/contato', async (req, res) => {
  try {
    const { nome, email, assunto, mensagem } = req.body;

    // Verificação para evitar requisições vazias
    if (!nome || !email || !assunto || !mensagem) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    // Query corrigida para inserir dados
    const query = `
      INSERT INTO contatos (nome, email, assunto, mensagem)
      VALUES ($1, $2, $3, $4) RETURNING *;
    `;

    const result = await pool.query(query, [nome, email, assunto, mensagem]);

    console.log('Contato salvo com sucesso:', result.rows[0]);
    res.status(201).json({ message: 'Contato salvo com sucesso' });

  } catch (error) {
    console.error('Erro ao salvar contato:', error);
    res.status(500).json({ error: 'Erro ao salvar contato' });
  }
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
