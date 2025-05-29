import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// Rota de login do ligante comum com JWT
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: 'Usuário e senha são obrigatórios.' });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Usuário ou senha inválidos.' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Usuário ou senha inválidos.' });
    }

    // Gera o JWT para o ligante autenticado
    const token = jwt.sign(
      { id: user._id, role: 'ligante' },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    // Retorna o token para o frontend
    return res.status(200).json({
      message: 'Login realizado com sucesso!',
      token,
      isLigante: true,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Erro ao realizar login.', error: error.message });
  }
});

export default router;
