import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User.js';

const router = express.Router();

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

    // Login aceito
    return res.status(200).json({ message: 'Login realizado com sucesso!' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Erro ao realizar login.', error: error.message });
  }
});

export default router;
