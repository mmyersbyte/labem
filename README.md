# LABEM

## Objetivo do Projeto

Um sistema para networking, compartilhar eventos, workshops e parcerias com marcas
Sistema separado EXCLUSIVO para professores e coordenadores compartilharem os conteudos com ligantes e marcar eventos com os mesmos;

## Backend

- Gerenciar o sistema de login dos ligantes
- Receber e armazenar mensagens do formulário de contato do site
- Servir de ponte entre o frontend e o banco de dados MongoDB Atlas

## Tecs Usadas

- **Node.js**:
- **Express.js**: Framework
- **MongoDB Atlas**: nosql
- **Mongoose**: Modelagem de dados
- **bcrypt**: Para proteger a senha do user
- **dotenv**: Gerenciamento de variáveis de ambiente
- **CORS**: Libera geral pro frontend conversar com o backend
-

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

## Como rodar localmente

1. Clone
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

## Documentação

- [Express.js](https://expressjs.com/pt-br/)
- [Mongoose](https://mongoosejs.com/)
- [MongoDB Atlas](https://www.mongodb.com/docs/atlas/)
- [bcrypt](https://www.npmjs.com/package/bcrypt)

## Duvidas

- Manda um email pedrovicstro@gmail.com
