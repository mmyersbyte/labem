import Update from '../models/Update.js';

export async function listarUpdates(req, res) {
  try {
    const updates = await Update.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, updates });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: 'Erro ao buscar atualizações.' });
  }
}

export async function obterUpdatePorId(req, res) {
  try {
    const update = await Update.findById(req.params.id);
    if (!update) {
      return res
        .status(404)
        .json({ success: false, message: 'Atualização não encontrada.' });
    }
    res.status(200).json({ success: true, update });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: 'Erro ao buscar atualização.' });
  }
}

export async function criarUpdate(req, res) {
  try {
    const { icone, titulo, paragrafo } = req.body;
    if (!icone || !titulo || !paragrafo) {
      return res
        .status(400)
        .json({ success: false, message: 'Todos os campos são obrigatórios.' });
    }
    const nova = new Update({ icone, titulo, paragrafo });
    await nova.save();
    res.status(201).json({
      success: true,
      message:
        'Atualização criada com sucesso! A atualização já está disponivel no site',
      update: nova,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: 'Erro ao criar atualização.' });
  }
}

// export async function editarUpdate(req, res) {
//   try {
//     const { icone, titulo, paragrafo } = req.body;
//     const update = await Update.findByIdAndUpdate(
//       req.params.id,
//       { icone, titulo, paragrafo },
//       { new: true }
//     );
//     if (!update) {
//       return res
//         .status(404)
//         .json({ success: false, message: 'Atualização não encontrada.' });
//     }
//     res.status(200).json({
//       success: true,
//       message: 'Atualização editada com sucesso!',
//       update,
//     });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ success: false, message: 'Erro ao editar atualização.' });
//   }
// }

export async function deletarUpdate(req, res) {
  try {
    const update = await Update.findByIdAndDelete(req.params.id);
    if (!update) {
      return res
        .status(404)
        .json({ success: false, message: 'Atualização não encontrada.' });
    }
    res
      .status(200)
      .json({ success: true, message: 'Atualização removida com sucesso!' });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: 'Erro ao remover atualização.' });
  }
}

export async function editarParcialUpdate(req, res) {
  try {
    const update = await Update.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!update) {
      return res.status(404).json({
        success: false,
        message: 'Atualização não encontrada.',
        update: null,
      });
    }
    res.status(200).json({
      success: true,
      message: 'Atualização editada com sucesso!',
      update,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: 'Erro ao editar atualização.' });
  }
}
