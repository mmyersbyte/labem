// Cache de elementos e constantes
const elements = {
  loginForm: document.getElementById('loginForm'),
  email: document.getElementById('email'),
  senha: document.getElementById('senha'),
  mensagem: document.getElementById('mensagem'),
};

const API_URL = 'https://labem-2.onrender.com/login';

// Função para fazer a requisição de login
async function fazerLogin(email, senha) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, senha }),
    });

    if (!response.ok) {
      throw new Error('Erro na requisição');
    }

    return await response.json();
  } catch (error) {
    console.error('Erro:', error);
    throw error;
  }
}

// Função para lidar com o sucesso do login
function handleLoginSuccess(data) {
  localStorage.setItem('token', data.token);
  window.location.href = './painel-do-ligante.html';
}

// Função para lidar com o erro do login
function handleLoginError(error) {
  const errorMessage = error.error || 'Erro ao fazer login';
  if (window.exibirMensagem) {
    window.exibirMensagem(errorMessage, 'error');
  } else {
    elements.mensagem.textContent = errorMessage;
  }

  // Adiciona efeito de shake
  elements.loginForm.classList.add('shake');
  setTimeout(() => elements.loginForm.classList.remove('shake'), 500);
}

// Event listener para o formulário
elements.loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = elements.email.value;
  const senha = elements.senha.value;

  try {
    const data = await fazerLogin(email, senha);

    if (data.success) {
      handleLoginSuccess(data);
    } else {
      handleLoginError(data);
    }
  } catch (error) {
    if (window.exibirMensagem) {
      window.exibirMensagem('Erro ao conectar ao servidor', 'error');
    } else {
      elements.mensagem.textContent = 'Erro ao conectar ao servidor';
    }
  }
});
