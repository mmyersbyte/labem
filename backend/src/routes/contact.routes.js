import express from 'express';
import {
  enviarContato,
  listarMensagensContato,
  deletarMensagemContato,
} from '../controllers/contact.Controller.js';
import { validateBody } from '../middleware/validate.js';
import { contactSchema } from '../validators/contactValidator.js';

const router = express.Router();

router.post('/', validateBody(contactSchema), enviarContato);
router.get('/', listarMensagensContato);
router.delete('/:id', deletarMensagemContato);

export default router;
