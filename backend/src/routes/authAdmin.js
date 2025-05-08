import express from 'express';
import bcrypt from 'bcrypt';
import UserAdmin from '../models/UserAdmin.js';

const router = express.Router();

// Rota de login administrativo
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

    // Login admin aceito: salva na sessão
    req.session.userId = admin._id;
    req.session.isAdmin = true;

    // Salva a sessão antes de retornar a resposta
    req.session.save((err) => {
      if (err) {
        console.error('Erro ao salvar sessão admin:', err);
        return res.status(500).json({
          message: 'Erro ao realizar login admin.',
        });
      }

      return res.status(200).json({
        message: 'Login administrativo realizado com sucesso!',
        isAdmin: true,
      });
    });
  } catch (error) {
    console.error('Erro no login admin:', error);
    res
      .status(500)
      .json({ message: 'Erro ao realizar login admin.', error: error.message });
  }
});

export default router;
