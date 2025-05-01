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

// Rota para buscar todas as mensagens de contato (GET)
// Retorna um array de mensagens ordenadas da mais recente para a mais antiga
router.get('/contact', async (req, res) => {
  try {
    const mensagens = await ContactMessage.find().sort({ dataEnvio: -1 });
    res.status(200).json({ success: true, mensagens });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar mensagens de contato.',
    });
  }
});

// Rota para deletar uma mensagem de contato pelo ID
// Exemplo de uso: DELETE /api/contact/:id
router.delete('/contact/:id', async (req, res) => {
  try {
    const mensagem = await ContactMessage.findByIdAndDelete(req.params.id);
    if (!mensagem) {
      return res
        .status(404)
        .json({ success: false, message: 'Mensagem não encontrada.' });
    }
    res
      .status(200)
      .json({ success: true, message: 'Mensagem deletada com sucesso!' });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao deletar mensagem.',
    });
  }
});

export default router;
