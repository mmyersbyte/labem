// Script externo do painel administrativo
// Inclui todas as funções de atualizações e mensagens de contato

// URL base da API de atualizações
const API_URL = 'https://labem.onrender.com/api/updates';

// Elementos do DOM
const form = document.getElementById('form-topicos');
const iconeInput = document.getElementById('icone');
const tituloInput = document.getElementById('titulo');
const paragrafoInput = document.getElementById('paragrafo');
const topicosContainer = document.getElementById('topicos-container');

// Carrega as atualizações ao abrir o painel
window.addEventListener('DOMContentLoaded', carregarAtualizacoes);

// Função para renderizar as atualizações
async function carregarAtualizacoes() {
  topicosContainer.innerHTML = '<p style="color:white">Carregando...</p>';
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
  }
}

// Função para criar o HTML de uma atualização
function criarHTMLUpdate(update) {
  return `
    <div class="update-box" data-id="${update._id}">
      <i class="fa-solid ${update.icone}"></i>
      <div class="update-text">
        <h3 contenteditable="true" onblur="salvarEdicao('${update._id}', 'titulo', this.innerText)">${update.titulo}</h3>
        <p contenteditable="true" onblur="salvarEdicao('${update._id}', 'paragrafo', this.innerText)">${update.paragrafo}</p>
      </div>
      <button type="button" class="btn btn-danger btn-custom" onclick="deletarUpdate('${update._id}')">Deletar</button>
      <button type="button" class="btn btn-primary btn-custom btn-editar-topico" data-id="${update._id}">Editar</button>
    </div>
  `;
}

// Adiciona novo tópico (atualização)
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
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // importante para cookies de sessão
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
    }
  });
}

// Função global para deletar atualização
window.deletarUpdate = async function (id) {
  if (!confirm('Tem certeza que deseja deletar?')) return;
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      credentials: 'include',
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
  }
};

// Função global para salvar edição inline
window.salvarEdicao = async function (id, campo, valor) {
  // Busca o update atual para manter os outros campos
  const box = document.querySelector(`.update-box[data-id='${id}']`);
  const titulo = box.querySelector('h3').innerText;
  const paragrafo = box.querySelector('p').innerText;
  const icone = box.querySelector('i').classList[1].replace('fa-', '');
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ icone, titulo, paragrafo }),
    });
    const data = await res.json();
    if (!data.success) {
      alert(data.message || 'Erro ao editar tópico.');
      carregarAtualizacoes();
    }
  } catch (err) {
    alert('Erro de conexão.');
  }
};

// Função para buscar e renderizar as mensagens do formulário de contato
async function carregarMensagensContato() {
  const container = document.getElementById('mensagens-banco');
  // Mantém o H3 didático sempre no topo
  const h3 = container.querySelector('h3');
  container.innerHTML = '';
  if (h3) container.appendChild(h3);
  container.innerHTML +=
    '<p style="color:#146677;text-align:center;">Carregando mensagens...</p>';
  try {
    // Faz a requisição GET para o backend
    const res = await fetch('https://labem.onrender.com/api/contact');
    const data = await res.json();
    if (data.success && data.mensagens.length > 0) {
      // Renderiza cada mensagem com botão de deletar
      data.mensagens.forEach((msg) => {
        const div = document.createElement('div');
        div.className = 'mensagem-item';
        div.setAttribute('data-id', msg._id);
        div.innerHTML = `
          <div class="mensagem-dados">
            <strong>Nome:</strong> ${msg.nome}<br>
            <a class="mensagem-email" href="mailto:${msg.email}" title="Enviar e-mail">${msg.email}</a><br>
            <span class="mensagem-assunto">Assunto: ${msg.assunto}</span>
          </div>
          <div class="mensagem-texto">
            ${msg.mensagem}
          </div>
          <button class="btn btn-danger btn-sm btn-deletar-msg" title="Deletar mensagem">
            <i class="fas fa-trash-alt"></i>
          </button>
        `;
        container.appendChild(div);
      });

      // Adiciona evento de click para todos os botões de deletar usando SweetAlert2
      container.querySelectorAll('.btn-deletar-msg').forEach((btn) => {
        btn.addEventListener('click', async function () {
          const mensagemDiv = this.closest('.mensagem-item');
          const id = mensagemDiv.getAttribute('data-id');
          // SweetAlert2 para confirmação
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
          if (result.isConfirmed) {
            await deletarMensagemContato(id);
          }
        });
      });
    } else {
      container.innerHTML +=
        '<p style="color:#146677;text-align:center;">Nenhuma mensagem encontrada.</p>';
    }
  } catch (err) {
    container.innerHTML +=
      '<p style="color:red;text-align:center;">Erro ao carregar mensagens.</p>';
  }
}

// Função para deletar uma mensagem de contato pelo ID
async function deletarMensagemContato(id) {
  try {
    const res = await fetch(`https://labem.onrender.com/api/contact/${id}`, {
      method: 'DELETE',
    });
    const data = await res.json();
    if (data.success) {
      carregarMensagensContato(); // Atualiza a lista
      // SweetAlert2 de sucesso
      Swal.fire({
        icon: 'success',
        title: 'Mensagem deletada!',
        text: 'A mensagem foi removida com sucesso.',
        confirmButtonColor: '#146677',
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Erro ao deletar',
        text: data.message || 'Erro ao deletar mensagem.',
        confirmButtonColor: '#146677',
      });
    }
  } catch (err) {
    Swal.fire({
      icon: 'error',
      title: 'Erro de conexão',
      text: 'Erro de conexão ao deletar mensagem.',
      confirmButtonColor: '#146677',
    });
  }
}

// Chama a função ao carregar a página
window.addEventListener('DOMContentLoaded', carregarMensagensContato);

// Evento para abrir o modal de edição ao clicar em Editar
document.addEventListener('click', function (e) {
  if (e.target.classList.contains('btn-editar-topico')) {
    const box = e.target.closest('.update-box');
    const id = box.getAttribute('data-id');
    const icone =
      Array.from(box.querySelector('i').classList).find(
        (c) =>
          c.startsWith('fa-') &&
          c !== 'fa-solid' &&
          c !== 'fa' &&
          c !== 'fa-regular' &&
          c !== 'fa-brands'
      ) || '';
    const titulo = box.querySelector('h3').innerText;
    const paragrafo = box.querySelector('p').innerText;
    // Preenche o modal com os dados atuais
    document.getElementById('editar-icone').value = icone;
    document.getElementById('editar-titulo').value = titulo;
    document.getElementById('editar-paragrafo').value = paragrafo;
    document.getElementById('form-editar-topico').setAttribute('data-id', id);
    // Abre o modal
    const modal = new bootstrap.Modal(
      document.getElementById('modal-editar-topico')
    );
    modal.show();
  }
});

// Evento de submit do modal de edição
const formEditar = document.getElementById('form-editar-topico');
if (formEditar) {
  formEditar.addEventListener('submit', async function (e) {
    e.preventDefault();
    const id = formEditar.getAttribute('data-id');
    const icone = document.getElementById('editar-icone')?.value?.trim() || '';
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

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
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
          title: 'Erro ao editar',
          text: data.message || 'Erro ao editar tópico.',
          confirmButtonColor: '#146677',
        });
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Erro de conexão',
        text: 'Erro de conexão ao editar tópico.',
        confirmButtonColor: '#146677',
      });
    }
  });
}
