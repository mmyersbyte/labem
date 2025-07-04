// URL base da API de encontros
const API_ENCONTROS = 'https://api.labemunisul.com.br/api/encontros';

const formEncontro = document.getElementById('form-encontro');
const previewContainer = document.getElementById('encontros-preview');

// Função para criar o HTML do card de preview do encontro, agora com botão de editar e deletar
function criarCardEncontro(encontro) {
  const slideUrl = `https://api.labemunisul.com.br/api/encontros/${encontro._id}/slide`;
  const materialUrl = `https://api.labemunisul.com.br/api/encontros/${encontro._id}/material`;
  return `
    <div class="encontro-card admin-preview-card" data-id="${encontro._id}">
      <div class="card-header">
        <h2>${encontro.titulo}</h2>
        <i class="fas fa-book-open"></i>
        <button class="btn btn-transparent text-primary btn-edit-encontro" title="Editar Encontro" style="background: transparent; border: none;">
          <i class="fas fa-edit"></i>
        </button>
        <button class="btn btn-transparent text-danger btn-delete-encontro" title="Deletar Encontro" style="background: transparent; border: none;">
          <i class="fas fa-trash-alt"></i>
        </button>
      </div>
      <div class="card-content">
        <a href="${slideUrl}" class="download-btn" target="_blank">
          <i class="fas fa-file-pdf"></i>
          Slides Teóricos
          <span class="file-size">PDF</span>
        </a>
        <a href="${materialUrl}" class="download-btn" target="_blank">
          <i class="fas fa-file-alt"></i>
          Material de Apoio
          <span class="file-size">PDF</span>
        </a>
      </div>
      <div class="card-footer">
        <span class="progress-text">${encontro.paragrafo}</span>
        <div class="progress-bar">
          <div class="progress" style="width: 25%"></div>
        </div>
      </div>
    </div>
  `;
}

// Função para carregar e exibir todos os encontros
async function carregarEncontros() {
  previewContainer.innerHTML =
    '<p style="color:#146677">Aguarde!! Carregando encontros...</p>';
  try {
    const res = await fetch(API_ENCONTROS);
    if (!res.ok) {
      console.error(
        'Erro HTTP ao buscar encontros:',
        res.status,
        res.statusText
      );
      previewContainer.innerHTML =
        '<p style="color:red">Erro ao carregar encontros (HTTP ' +
        res.status +
        ').</p>';
      return;
    }
    const data = await res.json();
    if (data.success && data.encontros.length > 0) {
      previewContainer.innerHTML = '';
      data.encontros.forEach((encontro) => {
        previewContainer.innerHTML += criarCardEncontro(encontro);
      });
    } else {
      previewContainer.innerHTML =
        '<p style="color:#146677">Nenhum encontro cadastrado.</p>';
    }
  } catch (err) {
    previewContainer.innerHTML =
      '<p style="color:red">Erro ao carregar encontros.</p>';
    console.error('Erro ao carregar encontros:', err);
  }
}

// Overlay de loading minimalista
function mostrarLoading() {
  if (document.getElementById('overlay-loading-encontros')) return;
  const overlay = document.createElement('div');
  overlay.id = 'overlay-loading-encontros';
  overlay.style.position = 'fixed';
  overlay.style.top = 0;
  overlay.style.left = 0;
  overlay.style.width = '100vw';
  overlay.style.height = '100vh';
  overlay.style.background = 'rgba(255,255,255,0.6)';
  overlay.style.display = 'flex';
  overlay.style.alignItems = 'center';
  overlay.style.justifyContent = 'center';
  overlay.style.zIndex = 99999;
  overlay.innerHTML = `
    <div style="display:flex;flex-direction:column;align-items:center;gap:1rem;">
      <div class="spinner" style="width:40px;height:40px;border:4px solid #146677;border-top:4px solid #b3e0ff;border-radius:50%;animation:spin 1s linear infinite;"></div>
      <span style="color:#146677;font-weight:500;">Processando...</span>
    </div>
    <style>@keyframes spin{0%{transform:rotate(0deg);}100%{transform:rotate(360deg);}}</style>
  `;
  document.body.appendChild(overlay);
}
function esconderLoading() {
  const overlay = document.getElementById('overlay-loading-encontros');
  if (overlay) overlay.remove();
}

// Função para deletar um encontro
async function deletarEncontro(id) {
  if (window.Swal) {
    const result = await Swal.fire({
      title: 'Tem certeza?',
      text: 'Esta ação não poderá ser desfeita!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#146677',
      confirmButtonText: 'Sim, deletar!',
      cancelButtonText: 'Cancelar',
    });
    if (!result.isConfirmed) return;
  } else {
    if (!confirm('Tem certeza que deseja deletar este encontro?')) return;
  }

  mostrarLoading();
  try {
    const res = await fetch(`${API_ENCONTROS}/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    if (res.status === 401) {
      window.location.href = 'login.html';
      return;
    }
    if (!res.ok) {
      console.error(
        'Erro HTTP ao deletar encontro:',
        res.status,
        res.statusText
      );
    }
    const data = await res.json();
    if (data.success) {
      if (window.Swal) {
        Swal.fire({
          icon: 'success',
          title: 'Encontro deletado!',
          text: data.message,
          confirmButtonColor: '#146677',
        });
      } else {
        alert('Encontro deletado com sucesso!');
      }
      carregarEncontros();
    } else {
      if (window.Swal) {
        Swal.fire({
          icon: 'error',
          title: 'Erro ao deletar',
          text: data.message || 'Erro ao deletar encontro.',
          confirmButtonColor: '#146677',
        });
      } else {
        alert(data.message || 'Erro ao deletar encontro.');
      }
      console.error('Erro ao deletar encontro:', data.message);
    }
  } catch (err) {
    if (window.Swal) {
      Swal.fire({
        icon: 'error',
        title: 'Erro de conexão',
        text: 'Erro ao conectar com o servidor.',
        confirmButtonColor: '#146677',
      });
    } else {
      alert('Erro ao conectar com o servidor.');
    }
    console.error('Erro ao deletar encontro:', err);
  } finally {
    esconderLoading();
  }
}

// Função para abrir modal de edição de encontro
function abrirModalEdicao(encontro) {
  // Cria o modal dinamicamente
  let modal = document.getElementById('modal-editar-encontro');
  if (modal) modal.remove();
  modal = document.createElement('div');
  modal.id = 'modal-editar-encontro';
  modal.innerHTML = `
    <div class="modal-backdrop" style="position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.4);z-index:9999;"></div>
    <div class="modal-content" style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:#fff;padding:2rem;border-radius:12px;z-index:10000;min-width:320px;max-width:95vw;">
      <h3>Editar Encontro</h3>
      <form id="form-editar-encontro">
        <div class="mb-2">
          <label for="edit-titulo">Título:</label>
          <input type="text" id="edit-titulo" class="form-control" value="${
            encontro.titulo || ''
          }" />
        </div>
        <div class="mb-2">
          <label for="edit-paragrafo">Comentário/Descrição:</label>
          <textarea id="edit-paragrafo" class="form-control" rows="3">${
            encontro.paragrafo || ''
          }</textarea>
        </div>
        <div class="mb-2">
          <label for="edit-slide">Novo PDF Slides Teóricos (opcional, máx 5MB):</label>
          <input type="file" id="edit-slide" class="form-control" accept="application/pdf" />
        </div>
        <div class="mb-2">
          <label for="edit-material">Novo PDF Material de Apoio (opcional, máx 5MB):</label>
          <input type="file" id="edit-material" class="form-control" accept="application/pdf" />
        </div>
        <div class="btn-group mt-3">
          <button type="submit" class="btn btn-primary">Salvar Alterações</button>
          <button type="button" class="btn btn-secondary" id="btn-cancelar-edicao">Cancelar</button>
        </div>
      </form>
    </div>
  `;
  document.body.appendChild(modal);

  // Evento de cancelar
  document.getElementById('btn-cancelar-edicao').onclick = () => modal.remove();

  // Evento de submit do form de edição
  document.getElementById('form-editar-encontro').onsubmit = async function (
    e
  ) {
    e.preventDefault();
    try {
      const titulo = document.getElementById('edit-titulo').value.trim();
      const paragrafo = document.getElementById('edit-paragrafo').value.trim();
      const slideTeorico = document.getElementById('edit-slide').files[0];
      const materialApoio = document.getElementById('edit-material').files[0];
      if (!titulo && !paragrafo && !slideTeorico && !materialApoio) {
        alert('Preencha pelo menos um campo para editar.');
        return;
      }
      const formData = new FormData();
      if (titulo) formData.append('titulo', titulo);
      if (paragrafo) formData.append('paragrafo', paragrafo);
      if (slideTeorico) formData.append('slideTeorico', slideTeorico);
      if (materialApoio) formData.append('materialApoio', materialApoio);
      const res = await fetch(`${API_ENCONTROS}/${encontro._id}`, {
        method: 'PATCH',
        credentials: 'include',
        body: formData,
      });
      let data;
      try {
        data = await res.json();
      } catch (jsonErr) {
        console.error('Erro ao processar resposta do servidor:', jsonErr);
        alert('Resposta inesperada do servidor.');
        return;
      }
      if (res.ok && data.success) {
        modal.remove();
        if (window.Swal) {
          Swal.fire({
            icon: 'success',
            title: 'Encontro editado!',
            text: data.message,
            confirmButtonColor: '#146677',
          });
        } else {
          alert('Encontro editado com sucesso!');
        }
        carregarEncontros();
      } else {
        if (window.Swal) {
          Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: data.message || 'Erro ao editar encontro.',
            confirmButtonColor: '#146677',
          });
        } else {
          alert(data.message || 'Erro ao editar encontro.');
        }
      }
    } catch (err) {
      console.error('Erro inesperado ao editar encontro:', err);
      alert(
        'Erro inesperado ao editar encontro. Veja o console para detalhes.'
      );
    }
  };
}

// Evento de submit do formulário
if (formEncontro) {
  formEncontro.addEventListener('submit', async function (e) {
    e.preventDefault();
    try {
      const titulo = document.getElementById('encontro-titulo').value.trim();
      const paragrafo = document
        .getElementById('encontro-paragrafo')
        .value.trim();
      const slideTeorico = document.getElementById('encontro-slides').files[0];
      const materialApoio =
        document.getElementById('encontro-material').files[0];

      if (!titulo || !paragrafo || !slideTeorico || !materialApoio) {
        alert('Preencha todos os campos e selecione os dois arquivos PDF!');
        console.error(
          'Campos obrigatórios não preenchidos ou arquivos não selecionados.'
        );
        return;
      }

      const formData = new FormData();
      formData.append('titulo', titulo);
      formData.append('paragrafo', paragrafo);
      formData.append('slideTeorico', slideTeorico);
      formData.append('materialApoio', materialApoio);

      mostrarLoading();
      let res;
      try {
        res = await fetch(API_ENCONTROS, {
          method: 'POST',
          credentials: 'include',
          body: formData,
        });
      } catch (fetchErr) {
        esconderLoading();
        console.error('Erro de rede/fetch:', fetchErr);
        alert('Erro de rede ao enviar o formulário.');
        return;
      }

      if (res.status === 401) {
        esconderLoading();
        window.location.href = 'login.html';
        return;
      }

      let data;
      try {
        data = await res.json();
      } catch (jsonErr) {
        esconderLoading();
        console.error('Erro ao processar resposta do servidor:', jsonErr);
        alert('Resposta inesperada do servidor.');
        return;
      }

      if (data.success) {
        formEncontro.reset();
        esconderLoading();
        if (window.Swal) {
          Swal.fire({
            icon: 'success',
            title: 'Encontro adicionado!',
            text: data.message,
            confirmButtonColor: '#146677',
          });
        } else {
          alert('Encontro adicionado com sucesso!');
        }
        carregarEncontros();
      } else {
        esconderLoading();
        if (window.Swal) {
          Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: data.message || 'Erro ao adicionar encontro.',
            confirmButtonColor: '#146677',
          });
        } else {
          alert(data.message || 'Erro ao adicionar encontro.');
        }
        console.error('Erro ao adicionar encontro:', data.message);
      }
    } catch (err) {
      esconderLoading();
      console.error('Erro inesperado no submit:', err);
      alert(
        'Erro inesperado ao enviar o formulário. Veja o console para detalhes.'
      );
    }
  });
}

// Delegação de evento para os botões de editar e deletar
previewContainer.addEventListener('click', function (e) {
  if (e.target.closest('.btn-delete-encontro')) {
    const card = e.target.closest('.encontro-card');
    const id = card.getAttribute('data-id');
    deletarEncontro(id);
  }
  if (e.target.closest('.btn-edit-encontro')) {
    const card = e.target.closest('.encontro-card');
    const id = card.getAttribute('data-id');
    // Buscar dados atuais do encontro para preencher o modal
    fetch(`${API_ENCONTROS}`)
      .then((res) => res.json())
      .then((data) => {
        const encontro = data.encontros.find((e) => e._id === id);
        if (encontro) abrirModalEdicao(encontro);
      });
  }
});

// Carregar encontros ao abrir a página
window.addEventListener('DOMContentLoaded', carregarEncontros);
