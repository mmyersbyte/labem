document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;
  const mensagem = document.getElementById('mensagem');

  try {
    const response = await fetch('https://labem-2.onrender.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, senha }),
    });

    const data = await response.json();
    console.log('Resposta do servidor:', data);

    if (data.success) {
      // Armazena o token JWT no localStorage para uso em requisições protegidas
      localStorage.setItem('token', data.token);
      // Redireciona para a página do ligante
      window.location.href = './painel-do-ligante.html';
    } else {
      // Usa a função exibircMensagem do login.js se disponível
      if (window.exibirMensagem) {
        window.exibirMensagem(data.error || 'Erro ao fazer login', 'error');
      } else {
        mensagem.textContent = data.error || 'Erro ao fazer login';
      }
      // Adiciona efeito de ---- balançar ---- se a função estiver ok
      if (document.querySelector('#loginForm').classList.contains('shake')) {
        document.querySelector('#loginForm').classList.add('shake');
        setTimeout(() => {
          document.querySelector('#loginForm').classList.remove('shake');
        }, 500);
      }
    }
  } catch (error) {
    console.error('Erro:', error);
    // Usa a function exibir Mensagem do login.js se disponível
    if (window.exibirMensagem) {
      window.exibirMensagem('Erro ao conectar ao servidor', 'error');
    } else {
      mensagem.textContent = 'Erro ao conectar ao servidor';
    }
  } finally {
    // Desativa o estado de carregamento se a função estiver disponível
    const btnEntrar = document.getElementById('btnEntrar');
    if (btnEntrar && btnEntrar.classList.contains('loading')) {
      btnEntrar.classList.remove('loading');
      btnEntrar.querySelector('.spinner-border').classList.add('d-none');
      btnEntrar.disabled = false;
    }
  }
});
