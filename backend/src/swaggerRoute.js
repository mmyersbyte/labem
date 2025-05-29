import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import express from 'express';

const router = express.Router();

router.get('/swagger.json', (req, res) => {
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
  const swaggerPath = path.join(__dirname, '../swagger.json');

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

export default router;
