
const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Configuração do CORS
const allowedOrigins = [
  'http://127.0.0.1:5501', // Frontend local
  'https://labem.vercel.app' // Frontend no Vercel
];

app.use(cors({
  origin: allowedOrigins, 
  methods: ['GET', 'POST'], 
  allowedHeaders: ['Content-Type'],
  credentials: true
}));

// Configuração do banco de dados Neon com Pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_akCQIUW4Aw6v@ep-royal-pine-a89zrpwb-pooler.eastus2.azure.neon.tech/contatos_db?sslmode=require',
  ssl: { rejectUnauthorized: false }
});

// Testa a conexão com o banco de dados
pool.query('SELECT 1', (err, result) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('Conectado ao banco de dados Neon');
  }
});

// Middleware para processar dados do formulário
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Rota para lidar com requisições OPTIONS (preflight)
app.options('*', cors());

// Rota para receber dados do formulário
app.post('/contato', (req, res) => {
  const { nome, email, assunto, mensagem } = req.body;

  if (!nome || !email || !assunto || !mensagem) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  // Insere os dados no banco de dados
  const query = `INSERT INTO contatos (nome, email, assunto, mensagem) VALUES ($1, $2, $3, $4)`;
  
  pool.query(query, [nome, email, assunto, mensagem])
    .then(() => {
      res.status(200).json({ message: 'Contato salvo com sucesso' });
    })
    .catch((err) => {
      console.error('Erro ao salvar contato:', err);
      res.status(500).json({ error: 'Erro ao salvar contato' });
    });
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
