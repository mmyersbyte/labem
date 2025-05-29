import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserAdmin from '../models/UserAdmin.js';

const router = express.Router();

// Rota de login administrativo com JWT
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Email e senha são obrigatórios.' });
    }

    const admin = await UserAdmin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: 'Email ou senha inválidos.' });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Email ou senha inválidos.' });
    }

    // Gera o JWT para o admin autenticado
    const token = jwt.sign(
      { id: admin._id, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    // Retorna o token para o frontend
    return res.status(200).json({
      message: 'Login administrativo realizado com sucesso!',
      token,
      isAdmin: true,
    });
  } catch (error) {
    console.error('Erro no login admin:', error);
    res
      .status(500)
      .json({ message: 'Erro ao realizar login admin.', error: error.message });
  }
});

export default router;
