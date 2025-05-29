// Verifica se o usuário está autenticado ao carregar a página
const token = localStorage.getItem('token');
if (!token) {
  window.location.href = 'login.html';
  // window.location.href = 'index.html';
}

// Função para buscar e renderizar as mensagens do formulário de contato
async function carregarMensagensContato() {
  const container = document.getElementById('mensagens-banco');
  // Mantém o H3 didático sempre no topo
  const h3 = container.querySelector('h3');
  container.innerHTML = '';
  if (h3) container.appendChild(h3);
  container.innerHTML +=
    '<p style="color:#146677;text-align:center;">Mensagens do Formulário de Contato</p>';
  try {
    // Faz a requisição GET para o render
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
    console.error('Erro ao carregar mensagens de contato:', err);
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
    console.error('Erro ao deletar mensagem de contato:', err);
  }
}

// Chama a função ao carregar a página
window.addEventListener('DOMContentLoaded', carregarMensagensContato);
