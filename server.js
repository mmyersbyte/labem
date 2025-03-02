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
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Origem não permitida pelo CORS'));
    }
  },
  methods: ['GET', 'POST'], // Métodos permitidos
  credentials: true // Permite cookies e cabeçalhos de autenticação
}));

// Configuração do banco de dados Neon com Pool
const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_akCQIUW4Aw6v@ep-royal-pine-a89zrpwb-pooler.eastus2.azure.neon.tech/contatos_db?sslmode=require',
  ssl: { rejectUnauthorized: false },
  max: 10, // Número máximo de conexões no pool
  idleTimeoutMillis: 30000, // Tempo máximo de inatividade de uma conexão
  connectionTimeoutMillis: 2000 // Tempo máximo para estabelecer uma conexão
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
app.options('/contato', (req, res) => {
  res.header('Access-Control-Allow-Origin', 'https://labem.vercel.app');
  res.header('Access-Control-Allow-Methods', 'GET, POST');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.status(200).send();
});

// Rota para receber dados do formulário
app.post('/contato', (req, res) => {
  // Configura os cabeçalhos CORS manualmente
  res.header('Access-Control-Allow-Origin', 'https://labem.vercel.app');
  res.header('Access-Control-Allow-Methods', 'GET, POST');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  const { nome, email, assunto, mensagem } = req.body;

  // Insere os dados no banco de dados
  const query = `
    INSERT INTO contatos (nome, email, assunto, mensagem)
    VALUES ($1, $2, $3, $4)
  `;
  pool.query(query, [nome, email, assunto, mensagem], (err, result) => {
    if (err) {
      console.error('Erro ao salvar contato:', err);
      res.status(500).send('Erro ao salvar contato');
    } else {
      console.log('Contato salvo com sucesso:', result);
      res.status(200).send('Contato salvo com sucesso');
    }
  });
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});