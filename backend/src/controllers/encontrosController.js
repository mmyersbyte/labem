import CreateEncontro from '../models/CreateEncontro.js';

export async function criarEncontro(req, res) {
  try {
    const { titulo, paragrafo } = req.body;
    if (
      !titulo ||
      !paragrafo ||
      !req.files['slideTeorico'] ||
      !req.files['materialApoio']
    ) {
      return res
        .status(400)
        .json({ success: false, message: 'Todos os campos são obrigatórios.' });
    }
    const slideTeoricoFile = req.files['slideTeorico'][0];
    const materialApoioFile = req.files['materialApoio'][0];
    const novoEncontro = new CreateEncontro({
      titulo,
      paragrafo,
      slideTeorico: {
        data: slideTeoricoFile.buffer,
        contentType: slideTeoricoFile.mimetype,
      },
      materialApoio: {
        data: materialApoioFile.buffer,
        contentType: materialApoioFile.mimetype,
      },
    });
    await novoEncontro.save();
    res.status(201).json({
      success: true,
      message: 'Encontro criado com sucesso!',
      encontro: {
        _id: novoEncontro._id,
        titulo: novoEncontro.titulo,
        paragrafo: novoEncontro.paragrafo,
        createdAt: novoEncontro.createdAt,
        slideTeorico: { contentType: novoEncontro.slideTeorico.contentType },
        materialApoio: { contentType: novoEncontro.materialApoio.contentType },
      },
    });
  } catch (error) {
    console.error('Erro ao criar encontro:', error);
    res.status(500).json({
      success: false,
      message:
        'O arquivo PDF é muito grande! Comprima-o no site ilovepdf.com antes de enviar.',
    });
  }
}

export async function deletarEncontro(req, res) {
  try {
    const encontro = await CreateEncontro.findByIdAndDelete(req.params.id);
    if (!encontro) {
      return res
        .status(404)
        .json({ success: false, message: 'Encontro não encontrado.' });
    }
    res
      .status(200)
      .json({ success: true, message: 'Encontro removido com sucesso!' });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: 'Erro ao remover encontro.' });
  }
}

export async function listarEncontros(req, res) {
  try {
    const encontros = await CreateEncontro.find(
      {},
      { 'slideTeorico.data': 0, 'materialApoio.data': 0 }
    ).sort({ createdAt: -1 });
    res.status(200).json({ success: true, encontros });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: 'Erro ao buscar encontros.' });
  }
}

export async function baixarSlide(req, res) {
  try {
    const encontro = await CreateEncontro.findById(req.params.id);
    if (!encontro || !encontro.slideTeorico || !encontro.slideTeorico.data) {
      return res.status(404).send('Slide não encontrado, contate a presidenta');
    }
    res.set(
      'Content-Type',
      encontro.slideTeorico.contentType || 'application/pdf'
    );
    res.set('Content-Disposition', 'inline; filename="slide-teorico.pdf"');
    res.send(encontro.slideTeorico.data);
  } catch (err) {
    console.error('Erro ao baixar slide:', err);
    res.status(500).send('Erro ao baixar o arquivo');
  }
}

export async function baixarMaterial(req, res) {
  try {
    const encontro = await CreateEncontro.findById(req.params.id);
    if (!encontro || !encontro.materialApoio || !encontro.materialApoio.data) {
      return res.status(404).send('Arquivo não encontrado');
    }
    res.set(
      'Content-Type',
      encontro.materialApoio.contentType || 'application/pdf'
    );
    res.set('Content-Disposition', 'inline; filename="material-apoio.pdf"');
    res.send(encontro.materialApoio.data);
  } catch (err) {
    console.error('Erro ao baixar material:', err);
    res.status(500).send('Erro ao baixar o arquivo');
  }
}
