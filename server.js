const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('pg');
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

// Configuração do banco de dados Neon
const client = new Client({
  connectionString: 'postgresql://neondb_owner:npg_akCQIUW4Aw6v@ep-royal-pine-a89zrpwb-pooler.eastus2.azure.neon.tech/contatos_db?sslmode=require',
  ssl: { rejectUnauthorized: false }
});

// Conecta ao banco de dados
client.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('Conectado ao banco de dados Neon');
  }
});

// Middleware para processar dados do formulário
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Rota para receber dados do formulário
app.post('/contato', (req, res) => {
  const { nome, email, assunto, mensagem } = req.body;

  // Insere os dados no banco de dados
  const query = `
    INSERT INTO contatos (nome, email, assunto, mensagem)
    VALUES ($1, $2, $3, $4)
  `;
  client.query(query, [nome, email, assunto, mensagem], (err, result) => {
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