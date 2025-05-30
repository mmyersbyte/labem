// URL base da API de encontros
const API_ENCONTROS = 'https://labem.onrender.com/api/encontros';

const formEncontro = document.getElementById('form-encontro');
const previewContainer = document.getElementById('encontros-preview');

// Função para criar o HTML do card de preview do encontro, agora com botão de deletar
function criarCardEncontro(encontro) {
  const slideUrl = `https://labem.onrender.com/api/encontros/${encontro._id}/slide`;
  const materialUrl = `https://labem.onrender.com/api/encontros/${encontro._id}/material`;
  return `
    <div class="encontro-card admin-preview-card" data-id="${encontro._id}">
      <div class="card-header">
        <h2>${encontro.titulo}</h2>
        <i class="fas fa-book-open"></i>
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

// Função utilitária para obter o token JWT salvo
function getToken() {
  return localStorage.getItem('token');
}

// Função utilitária para checar autenticação
function checarAutenticacao() {
  const token = getToken();
  if (!token) {
    window.location.href = 'login.html';
    return false;
  }
  return token;
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

  const token = checarAutenticacao();
  if (!token) return;

  try {
    const res = await fetch(`${API_ENCONTROS}/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`, // Envia o token JWT
      },
    });
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
  }
}

// Evento de submit do formulário
if (formEncontro) {
  formEncontro.addEventListener('submit', async function (e) {
    e.preventDefault();
    const titulo = document.getElementById('encontro-titulo').value.trim();
    const paragrafo = document
      .getElementById('encontro-paragrafo')
      .value.trim();
    const slideTeorico = document.getElementById('encontro-slides').files[0];
    const materialApoio = document.getElementById('encontro-material').files[0];

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

    const token = checarAutenticacao();
    if (!token) return;

    try {
      const res = await fetch(API_ENCONTROS, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`, // Envia o token JWT
        },
        body: formData,
      });
      if (!res.ok) {
        console.error(
          'Erro HTTP ao adicionar encontro:',
          res.status,
          res.statusText
        );
      }
      const data = await res.json();
      if (data.success) {
        formEncontro.reset();
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
      console.error('Erro ao adicionar encontro:', err);
    }
  });
}

// Delegação de evento para o botão de deletar
previewContainer.addEventListener('click', function (e) {
  if (e.target.closest('.btn-delete-encontro')) {
    const card = e.target.closest('.encontro-card');
    const id = card.getAttribute('data-id');
    deletarEncontro(id);
  }
});

// Carregar encontros ao abrir a página
window.addEventListener('DOMContentLoaded', carregarEncontros);
