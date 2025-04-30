import express from 'express';
import ContactMessage from '../models/ContactMessage.js';

const router = express.Router();

// Rota para receber mensagens de contato
router.post('/contact', async (req, res) => {
  try {
    // Extrai os campos do corpo da req
    const { nome, email, assunto, mensagem } = req.body;

    // Validação simples dos campos obrigatorios
    if (!nome || !email || !assunto || !mensagem) {
      return res.status(400).json({
        success: false,
        message: 'PREENCHA TUDO!!!!!!!S.',
      });
    }

    // Cria e salva a mensagem no banco de dados
    const novaMensagem = new ContactMessage({ nome, email, assunto, mensagem });
    await novaMensagem.save();

    // Resposta clara para o frontend
    res.status(201).json({
      success: true,
      message: 'Mensagem enviada com sucesso! A LABEM agradece o contato <3 .',
    });
  } catch (error) {
    // Em caso de erro
    res.status(500).json({
      success: false,
      message:
        'Erro ao enviar mensagem. Tente novamente mais tarde. Ou nós envie um e-mail: unisullabem@gmail.com',
    });
  }
});

export default router;
