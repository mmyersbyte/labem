import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export async function loginLigante(req, res) {
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

    const token = jwt.sign(
      { id: user._id, role: 'ligante' },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

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
}
