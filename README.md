<!-- Aqui é o titulo! -->
<p align="center">
  <a href="https://labemunisul.com.br">
    <img src="https://img.shields.io/badge/LABEM-Universidade_do_Sul_de_Santa_Catarina-146677?style=for-the-badge" alt="LABEM - Universidade do Sul de Santa Catarina">
  </a>
</p>

<hr />

<!-- stacks -->
<p align="center">
  <img src="https://img.shields.io/badge/JAVASCRIPT-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white" alt="JAVASCRIPT">
  <img src="https://img.shields.io/badge/NODE-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="NODE">
  <img src="https://img.shields.io/badge/EXPRESS.JS-FF6F61?style=for-the-badge&logo=express&logoColor=white" alt="EXPRESS.JS">
  <img src="https://img.shields.io/badge/MONGODB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MONGODB">
</p>

<!-- imagem -->
![Banner da LABEMGITHUB](assets/LABEMGITHUB.png)

## Objetivo do Projeto
Sistema desenvolvido para fortalecer o networking acadêmico, divulgar eventos, workshops e estabelecer parcerias com marcas relevantes da área de estética e biomedicina. A UNISUL não dispunha de uma plataforma própria para disponibilizar materiais exclusivos de palestras e outros eventos, marcar pacientes-modelo para procedimentos estéticos ou reunir marcas de destaque no setor.
Pensando nisso, o sistema oferece um painel exclusivo para professores, presidentes e coordenadores, que possibilita o compartilhamento de conteúdos com os ligantes, o agendamento de eventos e a interação direta com os membros da liga.
<hr/>
Além da interface principal, o projeto conta com um painel administrativo com autenticação e controle de acesso. Usuários com papel de ADMIN têm permissão para realizar operações de CRUD na seção "Últimas Notícias", exibida na página inicial por meio de requisições GET.
Também foi implementada uma rota POST com suporte a upload de arquivos PDF utilizando a lib Multer, permitindo o envio de materiais diretamente para o Painel do Ligante (Um ambiente com acesso restrito aos membros da universidade, destinado à organização de eventos com profissionais da área biomédica), também há a rota DELETE para manutenção de arquivos e início de semestre. 
Há também rotas GET para o preview de arquivos e alterações na section, guiando o administrador de como está ficando as alterações. 
O painel também inclui uma section para gerenciamento das mensagens recebidas pelo formulário de contato, GET e DELETE. (A resposta é pelo e-mail enviado no form)
O backend foi desenvolvido com Express, seguindo a estrutura de projeto padrão. O DB utilizado é o MongoDB, com a lib Mongoose responsável pela modelagem e pela conexão com a base de dados.
Dados sensíveis foram protegidos por meio do uso da lib dotenv, e as senhas dos usuários são armazenadas com segurança utilizando bcrypt para hash. Toda a comunicação entre o frontend e o backend é autorizada via CORS.
O deploy do backend foi no Render, enquanto o front foi hospedado na Vercel.
<hr/>


```
backend/
├── src/
│   ├── models/         
│   ├── routes/       
│   ├── config/         
│   └── app.js          
├── .env                
├── .gitignore
├── server.js       
└── package.json
 

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

## Duvidas

- Manda um email pedrovicstro@gmail.com
