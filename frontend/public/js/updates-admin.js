// Lógica de atualizações (updates) do painel administrativo

// URL base da API de atualizações
const API_URL = 'https://labem.onrender.com/api/updates';

// Elementos do DOM para updates
const form = document.getElementById('form-topicos');
const iconeInput = document.getElementById('icone');
const tituloInput = document.getElementById('titulo');
const paragrafoInput = document.getElementById('paragrafo');
const topicosContainer = document.getElementById('topicos-container');

window.addEventListener('DOMContentLoaded', carregarAtualizacoes);

// Função utilitária para obter o token JWT salvo
function getToken() {
  return localStorage.getItem('token');
}

// Função utilitária para checar autenticação
function checarAutenticacao() {
  const token = getToken();
  if (!token) {
    // Se não houver token, redireciona para o login
    window.location.href = 'login.html';
    return false;
  }
  return token;
}

async function carregarAtualizacoes() {
  topicosContainer.innerHTML = '<p style="color:white">Carregando...';
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    if (data.success) {
      if (data.updates.length === 0) {
        topicosContainer.innerHTML =
          '<p style="color:white">Nenhuma atualização cadastrada.</p>';
        return;
      }
      topicosContainer.innerHTML = '';
      data.updates.forEach((update) => {
        topicosContainer.innerHTML += criarHTMLUpdate(update);
      });
    } else {
      topicosContainer.innerHTML =
        '<p style="color:red">Erro ao carregar atualizações.</p>';
    }
  } catch (err) {
    topicosContainer.innerHTML =
      '<p style="color:red">Erro de conexão com o servidor.</p>';
    console.error('Erro ao carregar atualizações:', err);
  }
}

function criarHTMLUpdate(update) {
  return `
    <div class="update-box" data-id="${update._id}">
      <i class="${update.icone}"></i>
      <div class="update-text">
        <h3 contenteditable="true" onblur="salvarEdicao('${update._id}', 'titulo', this.innerText)">${update.titulo}</h3>
        <p contenteditable="true" onblur="salvarEdicao('${update._id}', 'paragrafo', this.innerText)">${update.paragrafo}</p>
      </div>
      <button type="button" class="btn btn-danger btn-custom" onclick="deletarUpdate('${update._id}')">Deletar</button>
      <button type="button" class="btn btn-primary btn-custom btn-editar-topico" data-id="${update._id}">Editar</button>
    </div>
  `;
}

if (form) {
  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const icone = iconeInput.value.trim();
    const titulo = tituloInput.value.trim();
    const paragrafo = paragrafoInput.value.trim();
    if (!icone || !titulo || !paragrafo) {
      alert('Preencha todos os campos!');
      return;
    }
    const token = checarAutenticacao();
    if (!token) return;
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Envia o token JWT
        },
        body: JSON.stringify({ icone, titulo, paragrafo }),
      });
      const data = await res.json();
      if (data.success) {
        form.reset();
        carregarAtualizacoes();
        alert('Tópico adicionado com sucesso!');
      } else {
        alert(data.message || 'Erro ao adicionar tópico.');
      }
    } catch (err) {
      alert('Erro de conexão.');
      console.error('Erro ao adicionar tópico:', err);
    }
  });
}

window.deletarUpdate = async function (id) {
  if (!confirm('Tem certeza que deseja deletar?')) return;
  const token = checarAutenticacao();
  if (!token) return;
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`, // Envia o token JWT
      },
    });
    const data = await res.json();
    if (data.success) {
      carregarAtualizacoes();
      alert('Tópico deletado com sucesso!');
    } else {
      alert(data.message || 'Erro ao deletar tópico.');
    }
  } catch (err) {
    alert('Erro de conexão.');
    console.error('Erro ao deletar atualização:', err);
  }
};

window.salvarEdicao = async function (id, campo, valor) {
  const box = document.querySelector(`.update-box[data-id='${id}']`);
  const titulo = box.querySelector('h3').innerText;
  const paragrafo = box.querySelector('p').innerText;
  const icone = box.querySelector('i').className;
  const token = checarAutenticacao();
  if (!token) return;
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Envia o token JWT
      },
      body: JSON.stringify({ icone, titulo, paragrafo }),
    });
    const data = await res.json();
    if (!data.success) {
      alert(data.message || 'Erro ao editar tópico.');
      carregarAtualizacoes();
    }
  } catch (err) {
    alert('Erro de conexão.');
    console.error('Erro ao salvar edição inline:', err);
  }
};

window.addEventListener('DOMContentLoaded', function () {
  document.addEventListener('click', function (e) {
    if (e.target.classList.contains('btn-editar-topico')) {
      const box = e.target.closest('.update-box');
      const id = box.getAttribute('data-id');
      const icone = Array.from(box.querySelector('i').classList)
        .filter(
          (c) =>
            c.startsWith('fa-') &&
            c !== 'fa-solid' &&
            c !== 'fa' &&
            c !== 'fa-regular' &&
            c !== 'fa-brands'
        )
        .join(' ');
      const titulo = box.querySelector('h3').innerText;
      const paragrafo = box.querySelector('p').innerText;
      document.getElementById('editar-icone').value = icone;
      document.getElementById('editar-titulo').value = titulo;
      document.getElementById('editar-paragrafo').value = paragrafo;
      document.getElementById('form-editar-topico').setAttribute('data-id', id);
      const modal = new bootstrap.Modal(
        document.getElementById('modal-editar-topico')
      );
      modal.show();
    }
  });

  const formEditar = document.getElementById('form-editar-topico');
  if (formEditar) {
    formEditar.addEventListener('submit', async function (e) {
      e.preventDefault();
      const id = formEditar.getAttribute('data-id');
      const icone =
        document.getElementById('editar-icone')?.value?.trim() || '';
      const titulo =
        document.getElementById('editar-titulo')?.value?.trim() || '';
      const paragrafo =
        document.getElementById('editar-paragrafo')?.value?.trim() || '';
      if (!icone || !titulo || !paragrafo) {
        Swal.fire({
          icon: 'warning',
          title: 'Preencha todos os campos!',
          confirmButtonColor: '#146677',
        });
        return;
      }
      const token = checarAutenticacao();
      if (!token) return;
      try {
        const res = await fetch(`${API_URL}/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Envia o token JWT
          },
          body: JSON.stringify({ icone, titulo, paragrafo }),
        });
        const data = await res.json();
        if (data.success) {
          const modal = bootstrap.Modal.getInstance(
            document.getElementById('modal-editar-topico')
          );
          modal.hide();
          carregarAtualizacoes();
          Swal.fire({
            icon: 'success',
            title: 'Tópico editado!',
            text: 'As alterações foram salvas com sucesso.',
            confirmButtonColor: '#146677',
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Erro ao editar tópico!',
            text: data.message || 'Erro ao editar tópico.',
            confirmButtonColor: '#146677',
          });
        }
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Erro de conexão!',
          text: 'Não foi possível editar o tópico.',
          confirmButtonColor: '#146677',
        });
        console.error('Erro ao editar tópico:', err);
      }
    });
  }
});
