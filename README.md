<!-- TÍTULO BADGE -->
<h1 align="center">
  <a href="https://labemunisul.com.br">
    <img width="420" src="https://img.shields.io/badge/LABEM-Universidade_do_Sul_de_Santa_Catarina-146677?style=for-the-badge" alt="LABEM - Universidade do Sul de Santa Catarina">
  </a>
</h1>

<!-- STACKS -->
<p align="center">
  <img src="https://img.shields.io/badge/JAVASCRIPT-%20-%23F7DF1E?style=for-the-badge&logo=javascript&logoColor=black&label=JAVASCRIPT&labelColor=F7DF1E" alt="JAVASCRIPT">
  <img src="https://img.shields.io/badge/TYPESCRIPT-%20-%233178C6?style=for-the-badge&logo=typescript&logoColor=white&label=TYPESCRIPT&labelColor=3178C6" alt="TYPESCRIPT">
  <img src="https://img.shields.io/badge/NODE.JS-%20-%23339933?style=for-the-badge&logo=node.js&logoColor=white&label=NODE.JS&labelColor=339933" alt="NODE.JS">
  <img src="https://img.shields.io/badge/EXPRESS-%20-FF6F61?style=for-the-badge&logo=express&logoColor=white&label=EXPRESS&labelColor=FF6F61" alt="EXPRESS">
  <img src="https://img.shields.io/badge/MONGODB-%20-47A248?style=for-the-badge&logo=mongodb&logoColor=white&label=MONGODB&labelColor=47A248" alt="MONGODB">
</p>

<!-- STACKS 2 -->
<p align="center">
  <a href="https://www.labemunisul.com.br/swagger.html">
    <img src="https://img.shields.io/badge/SWAGGER-DOCS-85EA2D?style=for-the-badge&logo=swagger&logoColor=black" alt="SWAGGER">
  </a>
  <a href="./EnglishREADME.md">
    <img src="https://img.shields.io/badge/README-EN-blue?style=for-the-badge" alt="README EN">
  </a>
  <img src="https://img.shields.io/badge/AUTH-JWT_with_HttpOnly_Cookies-critical?style=for-the-badge" alt="AUTH">
</p>


</p>

<!-- imagem -->
<img src="assets/LABEMGITHUB.png" alt="Banner da LABEMGITHUB" />

<h2>Objetivo do Projeto</h2> 
<p> Sistema desenvolvido para aprimorar a gestão da Liga Acadêmica de Biomedicina Estética da UNISUL, proporcionando um ambiente digital centralizado para networking, organização de eventos, workshops e parcerias com marcas do setor. Até então, a instituição não dispunha de uma solução própria capaz de integrar o compartilhamento de materiais exclusivos, chamadas de pacientes-modelo e divulgação de parceiros estratégicos.
O sistema disponibiliza painéis seguros e personalizados para professores, coordenadores, presidente da liga e ligantes, oferecendo controle eficiente sobre conteúdos, eventos e comunicação interna. Projetado para atender tanto ao público acadêmico quanto à comunidade externa, o projeto reforça o profissionalismo, a transparência e a excelência na gestão das atividades da liga.

</p>

<hr/>
<h2>Docs</h2> 
<img src="assets/swaggerLabem.png" alt="Swagger da API" />

<p>
Acesse a documentação Swagger em:  
<a href="https://www.labemunisul.com.br/swagger.html">https://www.labemunisul.com.br/swagger.html</a>
</p>

<h2>Autenticação e Segurança</h2>
<p>
A autenticação <code>JWT</code> utiliza <strong>cookies httpOnly</strong> para armazenar o token de sessão, aumentando a segurança contra ataques XSS. O backend faz uso do middleware <code>cookie-parser</code> para ler os cookies de autenticação nas requisições protegidas. O frontend foi adaptado para não manipular tokens diretamente, usando <code>credentials: 'include'</code> em todas as requisições autenticadas. Uso a lib <code>dotenv</code> para variáveis sensíveis, senhas criptografadas com <code>bcrypt</code> e <code>CORS</code> habilitado para integração frontend/backend.
<strong>O sistema não há sistema de cadastro, é uma equipe FIXA! Então gerei o acesso por um script temp, salvando a senha com hash por <code>bcrypt.hash()</code>  </strong>
</p>
<img src="assets/cors.png" alt="Configuração CORS segura no backend" width="700" height="auto" style="border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.10);" />

<h2>Integração de Domínios:</h2>
O backend está hospedado em um subdomínio e o frontend no domínio principal. Isso garante o funcionamento seguro dos cookies <code>httpOnly</code> para autenticação JWT e integração correta entre frontend e backend.
</p>

<h2>Painéis e Funcionalidades</h2>

<p>
<strong style="font-weight:600; font-size:1.1em;">Painel Administrativo</strong><br />
Implementei API para Últimas Notícias para manutenção do sistema principal (GET updates é a única rota pública). Desenvolvi API para upload de PDFs via <code>Multer</code>, com preview de arquivos e atualizações em tempo real. Gerenciei mensagens do formulário de contato com endpoints GET e DELETE, aumentando os números de parceria com o projeto. Resumindo, administradores podem utilizar as rotas para criar, atualizar, e excluir dados gerais de todo o sistema. </p>

<p>
<strong style="font-weight:600; font-size:1.1em;">Painel do Ligante</strong><br />
Acesso restrito aos membros da UNISUL. Organização de eventos com profissionais da área biomédica. Recepção de conteúdos enviados pelos coordenadores, professores e presidente.
</p>

<h2>Stacks</h2>
<p>
No backend utilizei <code>Node</code> com <code>Express</code>, <code>MongoDB Atlas</code> e <code>Mongoose</code> para conexão e modelagem do banco de dados, <code>JWT</code> junto com <code>cookie-parser</code> para autenticação segura via cookies httpOnly, <code>bcrypt</code> para hash de senhas, <code>Multer</code> para upload de arquivos, <code>CORS</code> para requisições externas, <code>dotenv</code> para variáveis de ambiente, <code>winston</code> para logging estruturado, <code>express-rate-limit</code> para limitar requisições, <code>Joi</code> para validação de dados e <code>ESModules</code> (import/export). No frontend, utilizei <code>HTML</code> e <code>CSS</code> para a estrutura e estilo da interface, <code>Bootstrap</code> para responsividade e componentes visuais, <code>JavaScript Vanilla</code> para interatividade, e a API nativa do JS, <code>Fetch</code>, para consumir os dados da API de forma assíncrona.
</p>

<h2>Logging</h2>
<p>
O backend utiliza a biblioteca <code>winston</code> para logging estruturado. Todos os erros e eventos importantes são registrados tanto no console quanto em arquivos na pasta <code>logs/</code> do projeto. Isso facilita o monitoramento, auditoria e manutenção do sistema.
</p>

<h2>Validação de Requests</h2>
<p>
Utilizo Joi para garantir a validação rigorosa dos dados enviados às rotas protegidas do backend. Os schemas asseguram que todos os campos obrigatórios estejam presentes e formatados corretamente, tanto para operações de criação quanto de edição (ex: encontros, atualizações, autenticação).
A validação é implementada como middleware, impedindo que dados inválidos cheguem à lógica da aplicação. Além das validações tradicionais, aplico expressões regulares para bloquear caracteres potencialmente perigosos (como <, >, $, ", '), reforçando a proteção contra ataques de injeção e XSS. As mensagens de erro são claras e objetivas, facilitando a identificação de problemas durante o consumo da API.
</p>
<img src="assets/validacao.png" alt="Validação robusta de dados com Joi e regex no backend" width="700" />


<h2>Testes Automatizados</h2>
<p> Os testes unitários foram implementados com o <code>Poku</code> leve, rápido e brasileiro! 🇧🇷
Além disso, utilizei <code>Thunder Client</code> e <code>HTTPie</code> para testes manuais dos endpoints.
</p>

<h2>App.js do projeto</h2>
<img src="assets/labemapp.png" alt="app.js do projeto" width="700" />

<h2>Em andamento</h2>
<p> O aplicativo está sendo "traduzido" para TypeScript para futuras features, já que a equipe atual continuará na LABEM até 2026, e uma nova equipe fixa assumirá com novas regras de négocio e manunteções futuras. </p>


<h2>Estrutura do Projeto</h2>
<pre><code>.
├── frontend
├── backend
│   ├── server.js
│   ├── .env
│   ├── package.json
│   └── src
│       ├── app.js
│       ├── config
│       │   └── db.js
│       ├── controllers
│       │   ├── authAdmin.Controller.js
│       │   ├── auth.Controller.js
│       │   ├── contact.Controller.js
│       │   ├── encontros.Controller.js
│       │   ├── root.Controller.js
│       │   └── updates.Controller.js
│       ├── middleware
│       │   ├── authenticateJWT.js
│       │   ├── authorizeAdmin.js
│       │   ├── errorHandler.js
│       │   ├── notFoundHandler.js
│       │   ├── rateLimiter.js
│       │   └── validate.js
│       ├── models
│       │   ├── ContactMessage.js
│       │   ├── CreateEncontro.js
│       │   ├── Update.js
│       │   ├── User.js
│       │   └── UserAdmin.js
│       ├── routes
│       │   ├── auth.routes.js
│       │   ├── authAdmin.routes.js
│       │   ├── contact.routes.js
│       │   ├── encontros.routes.js
│       │   ├── root.routes.js
│       │   ├── swagger.routes.js
│       │   └── updates.routes.js
│       ├── utils
│       │   └── logger.js
│       ├── validators
│       │   ├── authValidator.js
│       │   ├── contactValidator.js
│       │   ├── encontroValidator.js
│       │   └── updateValidator.js
│       └── swagger.json
</code></pre>


<h2>Como rodar localmente</h2>
<p> CLONE A BRANCH MAIN, a Branch com TyypeScript está em dev, adpate<p/>
<pre><code>cd backend
npm install
# Configure .env (MONGODB_URI, PORT=5555, JWT_SECRET, NODE_ENV=development)
node src/script.js  *cadastro*
npm start</code></pre>

<h3>Configuração obrigatória - CORS</h3>
<p>O sistema está em produção, possui dominio e você terá que adpatar o CORS para localhost</p>

<h3>Teste da API</h3>
<ul>
  <li><strong>API rodando:</strong> http://localhost:5555</li>
  <li><strong>Swagger docs:</strong> http://localhost:5555/swagger.html</li>
  <li><strong>Usuários criados:</strong> ligante@example.com / 123456 | professor@example.com / admin123</li>
</ul>

<h2>Deploy</h2>

<p>
O frontend da aplicação foi publicado com a <code>Vercel</code>. O backend está publicado na 
<code>Render</code>. A URL gerada permite que o front consuma a API normalmente.

</p>
