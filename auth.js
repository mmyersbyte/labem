// Cache de elementos e constantes - Otimizado para melhor performance
const elements = {
  loginForm: document.getElementById('loginForm'),
  email: document.getElementById('email'),
  senha: document.getElementById('senha'),
  mensagem: document.getElementById('mensagem'),
};

// Cache de configurações da API
const API_CONFIG = {
  url: 'https://labem-2.onrender.com/login',
  headers: {
    'Content-Type': 'application/json',
  },
};

// Cache de estados de requisição
let requestState = {
  inProgress: false,
  lastRequest: null,
};

// Cache de respostas para evitar requisições duplicadas
const responseCache = new Map();

// Função para fazer a requisição de login otimizada
async function fazerLogin(email, senha) {
  // Verifica se já existe uma requisição em andamento
  if (requestState.inProgress) {
    return Promise.reject(new Error('Requisição em andamento'));
  }

  // Verifica se já existe uma resposta em cache
  const cacheKey = `${email}:${senha}`;
  if (responseCache.has(cacheKey)) {
    return responseCache.get(cacheKey);
  }

  try {
    requestState.inProgress = true;
    requestState.lastRequest = Date.now();

    const response = await fetch(API_CONFIG.url, {
      method: 'POST',
      headers: API_CONFIG.headers,
      body: JSON.stringify({ email, senha }),
    });

    if (!response.ok) {
      throw new Error('Erro na requisição');
    }

    const data = await response.json();

    // Armazena a resposta em cache
    responseCache.set(cacheKey, data);

    return data;
  } catch (error) {
    console.error('Erro:', error);
    throw error;
  } finally {
    requestState.inProgress = false;
  }
}

// Função para lidar com o sucesso do login otimizada
function handleLoginSuccess(data) {
  // Armazena o token de forma segura
  localStorage.setItem('token', data.token);

  // Redireciona para o painel
  window.location.href = './painel-do-ligante.html';
}

// Função para lidar com o erro do login otimizada
function handleLoginError(error) {
  const errorMessage = error.error || 'Erro ao fazer login';

  // Usa a função global de exibição de mensagens
  if (window.exibirMensagem) {
    window.exibirMensagem(errorMessage, 'error');
  } else {
    elements.mensagem.textContent = errorMessage;
  }

  // Adiciona efeito de shake otimizado
  elements.loginForm.classList.add('shake');
  setTimeout(() => {
    elements.loginForm.classList.remove('shake');
  }, 500);
}

// Event listener para o formulário otimizado
elements.loginForm.addEventListener('submit', async e => {
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
