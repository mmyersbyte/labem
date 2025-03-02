const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors'); // Importe o pacote cors
const app = express();
const port = 3000;

// Habilita o CORS
app.use(cors());

// Configuração do banco de dados MySQL/MariaDB
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'sua_senha',
  database: 'contatos_db'
});

// Conecta ao banco de dados
db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('Conectado ao banco de dados MySQL/MariaDB');
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
    VALUES (?, ?, ?, ?)
  `;
  db.query(query, [nome, email, assunto, mensagem], (err, result) => {
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