import express from 'express';
import { loginLigante } from '../controllers/auth.Controller.js';

const router = express.Router();

// Rota de login do ligante comum com JWT
router.post('/login', loginLigante);

export default router;
