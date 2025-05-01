document
  .getElementById('loginForm')
  .addEventListener('submit', async function (e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const mensagem = document.getElementById('mensagem');
    const btnEntrar = document.getElementById('btnEntrar');
    const spinner = btnEntrar.querySelector('.spinner-border');
    const btnText = btnEntrar.querySelector('.btn-text');

    // Limpa mensagem anterior
    mensagem.innerText = '';
    mensagem.style.color = '';

    // Mostra spinner e desabilita botão
    spinner.classList.remove('d-none');
    btnText.textContent = 'CARREGANDO';
    btnEntrar.disabled = true;

    try {
      const response = await fetch('https://labem.onrender.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email, password: senha }),
      });

      const data = await response.json();

      if (response.ok) {
        window.location.href = 'painel-administrativo.html';
      } else {
        mensagem.innerText = 'Senha ou usuário incorretos!';
        mensagem.style.color = 'red';
      }
    } catch (err) {
      mensagem.innerText = 'Erro de conexão com o servidor.';
      mensagem.style.color = 'red';
    } finally {
      // Esconde spinner e habilita botão
      spinner.classList.add('d-none');
      btnText.textContent = 'Entrar';
      btnEntrar.disabled = false;
    }
  });

// Alternar exibição da senha ao clicar no ícone do olho
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
