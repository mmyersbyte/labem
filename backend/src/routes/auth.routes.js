import express from 'express';
import { loginLigante } from '../controllers/auth.Controller.js';
import { validateBody } from '../middleware/validate.js';
import { loginSchema } from '../validators/authValidator.js';

const router = express.Router();

// Rota de login do ligante comum com JWT e validação de joi
router.post('/login', validateBody(loginSchema), loginLigante);

export default router;
