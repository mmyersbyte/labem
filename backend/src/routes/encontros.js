import express from 'express';
import multer from 'multer';
import CreateEncontro from '../models/CreateEncontro.js';

const router = express.Router();

// Configuração do multer para armazenar arquivos em memória
const storage = multer.memoryStorage();
const upload = multer({ storage });

// POST /api/encontros - Cria um novo encontro
router.post(
  '/',
  upload.fields([
    { name: 'slideTeorico', maxCount: 1 },
    { name: 'materialApoio', maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { titulo, paragrafo } = req.body;
      if (
        !titulo ||
        !paragrafo ||
        !req.files['slideTeorico'] ||
        !req.files['materialApoio']
      ) {
        return res.status(400).json({
          success: false,
          message: 'Todos os campos são obrigatórios.',
        });
      }
      const slideTeoricoFile = req.files['slideTeorico'][0];
      const materialApoioFile = req.files['materialApoio'][0];

      const novoEncontro = new CreateEncontro({
        titulo,
        paragrafo,
        slideTeorico: {
          data: slideTeoricoFile.buffer,
          contentType: slideTeoricoFile.mimetype,
        },
        materialApoio: {
          data: materialApoioFile.buffer,
          contentType: materialApoioFile.mimetype,
        },
      });
      await novoEncontro.save();
      res.status(201).json({
        success: true,
        message: 'Encontro criado com sucesso!',
        encontro: novoEncontro,
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: 'Erro ao criar encontro.' });
    }
  }
);

// DELETE /api/encontros/:id - Remove um encontro
router.delete('/:id', async (req, res) => {
  try {
    const encontro = await CreateEncontro.findByIdAndDelete(req.params.id);
    if (!encontro) {
      return res
        .status(404)
        .json({ success: false, message: 'Encontro não encontrado.' });
    }
    res
      .status(200)
      .json({ success: true, message: 'Encontro removido com sucesso!' });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: 'Erro ao remover encontro.' });
  }
});

export default router;
