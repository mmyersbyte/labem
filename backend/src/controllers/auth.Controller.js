import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export async function loginLigante(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'E-mail e senha são obrigatórios.' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'E-mail ou senha inválidos.' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'E-mail ou senha inválidos.' });
    }

    const token = jwt.sign(
      { id: user._id, role: 'ligante' },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    // Envia o token como cookie httpOnly
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      domain: '.labemunisul.com.br',
      maxAge: 2 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: 'Login realizado com sucesso!',
      isLigante: true,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Erro ao realizar login.', error: error.message });
  }
}
