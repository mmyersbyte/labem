import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import app from './src/app.js';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

dotenv.config();

const PORT = process.env.PORT || 5555;

connectDB(process.env.MONGODB_URI);

// Rota para servir o arquivo swagger.json de forma segura e protegida por Referer
app.get('/swagger.json', (req, res) => {
  // Lista de domínios permitidos (adicione outros se necessário)
  const allowedReferers = [
    'https://www.labemunisul.com.br',
    'https://labemunisul.com.br',
    'https://labem.vercel.app',
  ];

  // Obtém o header Referer da requisição
  const referer = req.get('referer') || '';
  // Verifica se o Referer começa com algum domínio permitido
  const refererOk = allowedReferers.some((domain) =>
    referer.startsWith(domain)
  );

  if (!refererOk) {
    // Se não for permitido, retorna 403 (Forbidden)
    return res
      .status(403)
      .json({ message: 'Acesso não autorizado à documentação.' });
  }

  // Resolve o caminho absoluto do arquivo swagger.json
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const swaggerPath = path.join(__dirname, 'swagger.json');

  // Lê e retorna o conteúdo do arquivo swagger.json
  fs.readFile(swaggerPath, 'utf8', (err, data) => {
    if (err) {
      // Se não encontrar o arquivo, retorna 404
      return res.status(404).json({ message: 'swagger.json não encontrado' });
    }
    // Define o tipo de conteúdo como application/json
    res.type('application/json').send(data);
  });
});

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
