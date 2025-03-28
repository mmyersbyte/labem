const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;
//
// Configuração do CORS 
app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'OPTIONS'], // Métodos permitidos
  allowedHeaders: ['Content-Type'], // Cabeçalhos permitidos
  credentials: true // Permite credenciais (cookies, tokens)
}));

// Middleware para processar dados do formulário
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configuração do banco de dados Neon
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_akCQIUW4Aw6v@ep-royal-pine-a89zrpwb-pooler.eastus2.azure.neon.tech/contatos_db?sslmode=require',
  ssl: { rejectUnauthorized: false }
});

// Rota raiz (para verificar se o backend está funcionando)
app.get('/', (req, res) => {
  res.send('Backend está funcionando!');
});

// Rota para receber dados do formulário
app.post('/contato', (req, res) => {
  const { nome, email, assunto, mensagem } = req.body;

  // Verifica se todos os campos foram preenchidos
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
// login segurança
const authRoutes = require('./authRoutes');
app.use('/', authRoutes);

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});