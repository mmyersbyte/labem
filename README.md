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
  <a href="https://www.labemunisul.com.br/swagger.html">
    <img src="https://img.shields.io/badge/SWAGGER-DOCS-85EA2D?style=for-the-badge&logo=swagger&logoColor=black" alt="SWAGGER">
  </a>
</p>

<!-- imagem -->
<img src="assets/LABEMGITHUB.png" alt="Banner da LABEMGITHUB" />

<h2>Objetivo do Projeto</h2> 
<p>
Sistema desenvolvido para fortalecer o networking acadêmico, divulgar eventos e workshops, além de estabelecer parcerias com marcas relevantes da área de estética e biomedicina. A UNISUL não contava com uma plataforma própria para centralizar as atividades da liga, como o compartilhamento de materiais exclusivos de palestras e encontros, as chamadas de pacientes-modelo para procedimentos estéticos via session updates ou a divulgação de marcas parceiras do setor. Pensando nisso, este sistema foi criado para preencher essas lacunas, oferecendo uma solução digital segura e eficiente, que conecta profissionais da biomedicina estética aos membros da liga. A plataforma disponibiliza painéis distintos para professores, coordenadores e membros, cada um com funcionalidades específicas que facilitam a gestão de conteúdos, a organização de eventos e a comunicação interna. Dessa forma, a liga conta agora com um ambiente centralizado, moderno e funcional, que potencializa o engajamento acadêmico e amplia o alcance das suas atividades dentro e fora da universidade. Além disso, o site principal também foi pensado para o público geral, promovendo transparência e aproximando a comunidade das ações desenvolvidas pela liga.
</p>

<hr/>

<h2>Autenticação e Segurança</h2>
<p>
A autenticação <code>JWT</code> utiliza <strong>cookies httpOnly</strong> para armazenar o token de sessão, aumentando a segurança contra ataques XSS. O backend faz uso do middleware <code>cookie-parser</code> para ler os cookies de autenticação nas requisições protegidas. O frontend foi adaptado para não manipular tokens diretamente, usando <code>credentials: 'include'</code> em todas as requisições autenticadas. Uso a lib <code>dotenv</code> para variáveis sensíveis, senhas criptografadas com <code>bcrypt</code> e <code>CORS</code> habilitado para integração frontend/backend.
<strong>O sistema não há sistema de cadastro, é uma equipe FIXA! Então gerei o acesso por um script temp, salvando a senha com hash por <code>bcrypt.hash()</code>  </strong>
</p>

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
Utilizei o <code>Joi</code> para validação robusta dos dados recebidos nas rotas protegidas do backend. Os schemas garantem que os campos obrigatórios estejam presentes e com o formato correto, tanto para criação quanto para edição de recursos (ex: encontros, updates, autenticação). A validação é feita via middleware, retornando mensagens obvias. 
</p>

<h2>Testes Automatizados</h2>
<p> Os testes unitários foram implementados com o <code>Poku</code> leve, rápido e brasileiro! 🇧🇷
Além disso, utilizei <code>Thunder Client</code> e <code>HTTPie</code> para testes manuais dos endpoints.
</p>

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

<p>
Acesse a documentação Swagger em:  
<a href="https://www.labemunisul.com.br/swagger.html">https://www.labemunisul.com.br/swagger.html</a>
</p>

<h2>Como rodar localmente</h2>
<p>
Clone este repositório, crie um arquivo <code>.env</code> com base no exemplo fornecido, instale as dependências com <code>npm install</code> e, se necessário, ajuste o <code>CORS</code> para permitir o uso com a interface gráfica local.
Este sistema não possui fluxo de cadastro: O acesso é limitado a uma equipe fixa. Para gerar um usuário com acesso administrativo, utilize um script temporário que insira manualmente os dados no banco, salvando a senha com <code>bcrypt.hash()</code>.
Todas as requisições autenticadas do frontend já usam <code>credentials: 'include'</code> para envio de cookies.<br>
</p>

<h2>Deploy</h2>

<p>
O frontend da aplicação foi publicado com a <code>Vercel</code>. O backend está publicado na 
<code>Render</code>. A URL gerada permite que o front consuma a API normalmente.

</p>
