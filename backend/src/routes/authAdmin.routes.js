import express from 'express';
import { loginAdmin } from '../controllers/authAdminController.js';
const router = express.Router();

// Rota de login administrativo com JWT
router.post('/login', loginAdmin);

export default router;
