import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import express from 'express';

const router = express.Router();

// Expressões Regulares para domínios permitidos
const allowedOriginsRegex = [
  /^https:\/\/(www\.)?labemunisul\.com\.br$/,
  /^https:\/\/labem\.vercel\.app$/,
];

// Endpoint para servir o swagger.json com verificação de origem
router.get('/swagger.json', (req, res) => {
  // Tenta obter Origin ou Referer
  const origin = req.get('origin') || req.get('referer') || '';

  // Verifica se o origin/referer corresponde a algum dos domínios permitidos via regex
  const originOk = allowedOriginsRegex.some((regex) => regex.test(origin));

  if (!originOk) {
    return res
      .status(403)
      .json({ message: 'Acesso não autorizado à documentação.' });
  }

  // Caminho absoluto do arquivo swagger.json
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const swaggerPath = path.join(__dirname, '../swagger.json');

  // Lê e envia o conteúdo do swagger.json
  fs.readFile(swaggerPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(404).json({ message: 'swagger.json não encontrado' });
    }
    res.type('application/json').send(data);
  });
});

export default router;
