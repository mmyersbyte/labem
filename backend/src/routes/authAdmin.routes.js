import express from 'express';
import { loginAdmin } from '../controllers/authAdmin.Controller.js';
import { validateBody } from '../middleware/validate.js';
import { loginSchema } from '../validators/authValidator.js';
const router = express.Router();

// Rota de login administrativo com JWT e validação de joi
router.post('/login', validateBody(loginSchema), loginAdmin);

export default router;
