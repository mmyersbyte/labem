# 🚀 LABEM - Backend

Bem-vindo ao backend da LABEM! Aqui a gente conecta, protege e faz a mágica acontecer nos bastidores do site da Liga Acadêmica de Estética e Bem-Estar da Unisul. 💅✨

## 🧑‍💻 Objetivo do Projeto

Este backend foi criado para:

- Gerenciar o sistema de login dos ligantes (com segurança de verdade, nada de senha "1234" aqui!)
- Receber e armazenar mensagens do formulário de contato do site
- Servir de ponte entre o frontend e o banco de dados MongoDB Atlas

## 🛠️ Tecnologias Usadas

- **Node.js**: O motor por trás de tudo
- **Express.js**: Framework web rápido e flexível
- **MongoDB Atlas**: Banco de dados na nuvem, escalável e seguro
- **Mongoose**: Modelagem de dados elegante para MongoDB
- **bcrypt**: Para proteger as senhas dos usuários
- **dotenv**: Gerenciamento de variáveis de ambiente (segurança em primeiro lugar!)
- **CORS**: Libera geral pro frontend conversar com o backend

## 📦 Estrutura Básica

```
backend/
├── src/
│   ├── models/         # Modelos do banco (User, ContactMessage)
│   ├── routes/         # Rotas (auth, contact)
│   ├── config/         # Configuração do banco
│   └── app.js          # App principal
├── .env                # Variáveis sensíveis (NUNCA subir pro GitHub)
├── .gitignore          # O que não vai pro repositório
└── package.json        # Dependências e scripts
```

## 🏁 Como rodar localmente

1. Clone o repositório
2. Crie um arquivo `.env` com sua string do MongoDB Atlas
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Rode o servidor:
   ```bash
   npm start
   ```
5. O backend vai rodar em `http://localhost:5555` (ou a porta do seu `.env`)

## 🔒 Segurança

- Nunca suba o `.env` pro GitHub (já está no `.gitignore`)
- Senhas são sempre criptografadas
- Use HTTPS em produção

## 📚 Documentação útil

- [Express.js](https://expressjs.com/pt-br/)
- [Mongoose](https://mongoosejs.com/)
- [MongoDB Atlas](https://www.mongodb.com/docs/atlas/)
- [bcrypt](https://www.npmjs.com/package/bcrypt)

## 🤙 Dúvidas?

Abre uma issue, chama no direct ou manda aquele e-mail maroto. Bora construir junto!

---

> Feito com 💙 pela galera da LABEM
