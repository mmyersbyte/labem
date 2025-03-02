const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Configuração do CORS (DEVE VIR ANTES DAS ROTAS!)
const allowedOrigins = [
  'http://127.0.0.1:5501', 
  'https://labem.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Origem não permitida por CORS'));
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: true
}));

// Middleware para processar dados do formulário
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configuração do banco de dados Neon
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_akCQIUW4Aw6v@ep-royal-pine-a89zrpwb-pooler.eastus2.azure.neon.tech/contatos_db?sslmode=require',
  ssl: { rejectUnauthorized: false }
});

// Rota raiz (FORA da rota POST!)
app.get('/', (req, res) => {
  res.send('Backend está funcionando!');
});

// Rota para receber dados do formulário
app.post('/contato', (req, res) => {
  const { nome, email, assunto, mensagem } = req.body;

  if (!nome || !email || !assunto || !mensagem) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

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