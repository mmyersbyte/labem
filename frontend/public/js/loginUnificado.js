/**
 * loginUnificado.js
 * Script para autenticação unificada de usuários comuns e administradores.
 * Utiliza a mesma tela de login, sem botões ou campos extras.
 * O sistema identifica automaticamente o tipo de usuário pelas credenciais.
 *
 * Fluxo:
 * 1. O usuário digita email/usuário e senha normalmente.
 * 2. O sistema tenta autenticar como usuário comum.
 * 3. Se falhar, tenta autenticar como admin.
 * 4. Redireciona para o painel correto conforme o tipo de usuário.
 * 5. Se ambos falharem, exibe mensagem de erro.
 */

document.addEventListener('DOMContentLoaded', function () {
  // Seleciona o formulário de login
  const loginForm = document.getElementById('loginForm');

  // Remove event listeners antigos clonando o nó (evita conflitos)
  const newForm = loginForm.cloneNode(true);
  loginForm.parentNode.replaceChild(newForm, loginForm);

  // Adiciona o event listener principal para o submit do formulário
  newForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    // Captura os campos do formulário
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const mensagem = document.getElementById('mensagem');
    const btnEntrar = document.getElementById('btnEntrar');
    const spinner = btnEntrar.querySelector('.spinner-border');
    const btnText = btnEntrar.querySelector('.btn-text');

    // Limpa mensagens anteriores
    mensagem.innerText = '';
    mensagem.style.color = '';

    // Mostra spinner e desabilita o botão
    spinner.classList.remove('d-none');
    btnText.textContent = 'CARREGANDO';
    btnEntrar.disabled = true;

    try {
      // 1. Tenta autenticar como usuário comum
      let response = await fetch('https://labem.onrender.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Garante envio de cookies de sessão
        body: JSON.stringify({ username: email, password: senha }),
      });

      let data = await response.json();

      if (response.ok) {
        // Login de usuário comum bem-sucedido
        window.location.href = 'painel-do-ligante.html';
        return;
      }

      // 2. Se falhar, tenta autenticar como administrador
      response = await fetch('https://labem.onrender.com/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email: email, password: senha }),
      });

      data = await response.json();

      if (response.ok) {
        // Login de admin bem-sucedido
        window.location.href = 'painel-administrativo.html';
        return;
      }

      // 3. Se ambos falharem, exibe mensagem de erro
      mensagem.innerText = 'Email/usuário ou senha incorretos!';
      mensagem.style.color = 'red';
    } catch (err) {
      // 4. Erro de conexão ou outro erro inesperado
      mensagem.innerText = 'Erro de conexão com o servidor.';
      mensagem.style.color = 'red';
      console.error('Erro no login:', err);
    } finally {
      // 5. Restaura o botão e esconde o spinner
      spinner.classList.add('d-none');
      btnText.textContent = 'Entrar';
      btnEntrar.disabled = false;
    }
  });

  // Reconfigura o toggle de exibição da senha (olhinho)
  const senhaInput = document.getElementById('senha');
  const toggleSenha = document.getElementById('toggleSenha');
  if (toggleSenha) {
    toggleSenha.addEventListener('click', function () {
      if (senhaInput.type === 'password') {
        senhaInput.type = 'text';
        toggleSenha.querySelector('i').classList.remove('fa-eye');
        toggleSenha.querySelector('i').classList.add('fa-eye-slash');
      } else {
        senhaInput.type = 'password';
        toggleSenha.querySelector('i').classList.remove('fa-eye-slash');
        toggleSenha.querySelector('i').classList.add('fa-eye');
      }
    });
  }
});
