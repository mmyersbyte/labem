import express from 'express';
import { loginLigante } from '../controllers/authController.js';

const router = express.Router();

// Rota de login do ligante comum com JWT
router.post('/login', loginLigante);

export default router;
