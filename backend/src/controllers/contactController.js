import ContactMessage from '../models/ContactMessage.js';

export async function enviarContato(req, res) {
  try {
    const { nome, email, assunto, mensagem } = req.body;

    if (!nome || !email || !assunto || !mensagem) {
      return res.status(400).json({
        success: false,
        message: 'PREENCHA TUDO!!!!!!!S.',
      });
    }

    const novaMensagem = new ContactMessage({ nome, email, assunto, mensagem });
    await novaMensagem.save();
    // Resposta front
    res.status(201).json({
      success: true,
      message: 'Mensagem enviada com sucesso! A LABEM agradece o contato <3 .',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        'Erro ao enviar mensagem. Tente novamente mais tarde. Ou nós envie um e-mail: unisullabem@gmail.com',
    });
  }
}

export async function listarMensagensContato(req, res) {
  try {
    const mensagens = await ContactMessage.find().sort({ dataEnvio: -1 });
    res.status(200).json({ success: true, mensagens });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar mensagens de contato.',
    });
  }
}

export async function deletarMensagemContato(req, res) {
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
}
