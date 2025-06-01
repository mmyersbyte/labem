import express from 'express';
import {
  enviarContato,
  listarMensagensContato,
  deletarMensagemContato,
} from '../controllers/contactController.js';

const router = express.Router();

router.post('/', enviarContato);
router.get('/', listarMensagensContato);
router.delete('/:id', deletarMensagemContato);

export default router;
