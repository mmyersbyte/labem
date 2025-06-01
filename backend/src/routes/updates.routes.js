import express from 'express';
import { authenticateJWT } from '../middleware/authenticateJWT.js';
import { authorizeAdmin } from '../middleware/authorizeAdmin.js';
import {
  listarUpdates,
  obterUpdatePorId,
  criarUpdate,
  editarUpdate,
  deletarUpdate,
  editarParcialUpdate,
} from '../controllers/updates.Controller.js';

const router = express.Router();

// GET /api/updates - Lista todas as atualizações (público geral do site, index.html)
router.get('/', listarUpdates);

router.get('/:id', obterUpdatePorId);

// POST /api/updates - Cria uma nova atualização (protegido com jWT)
router.post('/', authenticateJWT, authorizeAdmin, criarUpdate);

// PUT /api/updates/:id - Edita uma atualização (protegido JWT)
router.put('/:id', authenticateJWT, authorizeAdmin, editarUpdate);

// DELETE /api/updates/:id - Remove uma atualização (protegido JWT)
router.delete('/:id', authenticateJWT, authorizeAdmin, deletarUpdate);

// PATCH /api/updates/:id - Atualiza parcialmente uma atualização (protegido) *TROCADA PELA PUT QUE TAVA PODRE*
router.patch('/:id', authenticateJWT, authorizeAdmin, editarParcialUpdate);

export default router;
