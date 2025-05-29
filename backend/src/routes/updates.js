import express from 'express';
import Update from '../models/Update.js';
import { authenticateJWT } from '../middleware/authenticateJWT.js';
import { authorizeAdmin } from '../middleware/authorizeAdmin.js';

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

router.get('/:id', async (req, res) => {
  try {
    const update = await Update.findById(req.params.id);
    res.status(200).json({ success: true, update });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: 'Erro ao buscar atualização.' });
  }
});

// POST /api/updates - Cria uma nova atualização (protegido)
router.post('/', authenticateJWT, authorizeAdmin, async (req, res) => {
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
});

// PUT /api/updates/:id - Edita uma atualização (protegido)
router.put('/:id', authenticateJWT, authorizeAdmin, async (req, res) => {
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
    console.error(error);

    res
      .status(500)
      .json({ success: false, message: 'Erro ao editar atualização.' });
  }
});

// DELETE /api/updates/:id - Remove uma atualização (protegido)
router.delete('/:id', authenticateJWT, authorizeAdmin, async (req, res) => {
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
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: 'Erro ao remover atualização.' });
  }
});

// PATCH /api/updates/:id - Atualiza parcialmente uma atualização (protegido) *TROCADA PELA PUT QUE TAVA PODRE*
router.patch('/:id', authenticateJWT, authorizeAdmin, async (req, res) => {
  try {
    const update = await Update.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!update) {
      console.warn(
        'PATCH: Atualização não encontrada para o id:',
        req.params.id
      );
      return res.status(404).json({
        success: false,
        message: 'Atualização não encontrada.',
        update: null,
      });
    }
    res.status(200).json({
      success: true,
      message: 'Atualização editada com sucesso!',
      update,
    });
  } catch (error) {
    console.error('Erro na rota PATCH /api/updates/:id:', error);
    res
      .status(500)
      .json({ success: false, message: 'Erro ao editar atualização.' });
  }
});

export default router;
