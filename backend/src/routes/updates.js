import express from 'express';
import Update from '../models/Update.js';
// import authMiddleware from '../middleware/auth.js'; // Middleware de autenticação já existente

const router = express.Router();

// GET /api/updates - Lista todas as atualizações (público)
router.get('/', async (req, res) => {
  try {
    const updates = await Update.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, updates });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: 'Erro ao buscar atualizações.' });
  }
});

// POST /api/updates - Cria uma nova atualização (protegido)
// router.post('/', authMiddleware, async (req, res) => {
router.post(
  '/',
  /* authMiddleware, */ async (req, res) => {
    try {
      const { icone, titulo, paragrafo } = req.body;
      if (!icone || !titulo || !paragrafo) {
        return res.status(400).json({
          success: false,
          message: 'Todos os campos são obrigatórios.',
        });
      }
      const nova = new Update({ icone, titulo, paragrafo });
      await nova.save();
      res.status(201).json({
        success: true,
        message: 'Atualização criada com sucesso!',
        update: nova,
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: 'Erro ao criar atualização.' });
    }
  }
);

// PUT /api/updates/:id - Edita uma atualização (protegido)
// router.put('/:id', authMiddleware, async (req, res) => {
router.put(
  '/:id',
  /* authMiddleware, */ async (req, res) => {
    try {
      const { icone, titulo, paragrafo } = req.body;
      const update = await Update.findByIdAndUpdate(
        req.params.id,
        { icone, titulo, paragrafo },
        { new: true }
      );
      if (!update) {
        return res
          .status(404)
          .json({ success: false, message: 'Atualização não encontrada.' });
      }
      res.status(200).json({
        success: true,
        message: 'Atualização editada com sucesso!',
        update,
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: 'Erro ao editar atualização.' });
    }
  }
);

// DELETE /api/updates/:id - Remove uma atualização (protegido)
// router.delete('/:id', authMiddleware, async (req, res) => {
router.delete(
  '/:id',
  /* authMiddleware, */ async (req, res) => {
    try {
      const update = await Update.findByIdAndDelete(req.params.id);
      if (!update) {
        return res
          .status(404)
          .json({ success: false, message: 'Atualização não encontrada.' });
      }
      res
        .status(200)
        .json({ success: true, message: 'Atualização removida com sucesso!' });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: 'Erro ao remover atualização.' });
    }
  }
);

export default router;
