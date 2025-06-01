import express from 'express';
import { loginAdmin } from '../controllers/authAdmin.Controller.js';
const router = express.Router();

// Rota de login administrativo com JWT
router.post('/login', loginAdmin);

export default router;
