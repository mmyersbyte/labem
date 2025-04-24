// Cache de elementos e constantes - Otimizado para melhor performance
const elements = {
  loginForm: document.getElementById('loginForm'),
  emailInput: document.getElementById('email'),
  senhaInput: document.getElementById('senha'),
  lembrarSenhaCheckbox: document.getElementById('lembrarSenha'),
  mensagemElement: document.getElementById('mensagem'),
  btnEntrar: document.getElementById('btnEntrar'),
  toggleSenhaBtn: document.getElementById('toggleSenha'),
  emailFeedback: document.getElementById('emailFeedback'),
  senhaFeedback: document.getElementById('senhaFeedback'),
};

// Cache de regex e constantes - Otimizado para melhor performance
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_SENHA_LENGTH = 6;
const DEBOUNCE_DELAY = 300;

// Cache de classes CSS - Otimizado para melhor performance
const CSS_CLASSES = {
  invalid: 'is-invalid',
  valid: 'is-valid',
  loading: 'loading',
  shake: 'shake',
  hidden: 'd-none',
  success: 'text-success',
  danger: 'text-danger',
};

// Cache de mensagens - Otimizado para melhor performance
const MESSAGES = {
  emailRequired: 'O email é obrigatório',
  emailInvalid: 'Digite um email válido',
  senhaRequired: 'A senha é obrigatória',
  senhaLength: 'A senha deve ter pelo menos 6 caracteres',
};

// Cache de localStorage keys - Otimizado para melhor performance
const STORAGE_KEYS = {
  email: 'lembrarEmail',
  senha: 'lembrarSenha',
};

// Cache de estados de validação
let validationState = {
  email: false,
  senha: false,
};

// Cache de timeouts para debounce
let timeouts = {
  email: null,
  senha: null,
};

// Inicialização otimizada
document.addEventListener('DOMContentLoaded', () => {
  // Carrega dados salvos de forma assíncrona
  requestIdleCallback(verificarDadosSalvos);

  // Configura eventos de forma otimizada
  setupEventListeners();

  // Carregamento lazy de recursos não críticos
  requestIdleCallback(() => {
    loadNonCriticalResources();
  });
});

// Configuração de eventos otimizada
function setupEventListeners() {
  // Eventos de input com debounce otimizado
  elements.emailInput.addEventListener(
    'input',
    debounce(() => {
      validationState.email = validarEmail();
    }, DEBOUNCE_DELAY)
  );

  elements.senhaInput.addEventListener(
    'input',
    debounce(() => {
      validationState.senha = validarSenha();
    }, DEBOUNCE_DELAY)
  );

  // Eventos de clique otimizados
  elements.toggleSenhaBtn.addEventListener('click', alternarVisibilidadeSenha);
  elements.loginForm.addEventListener('submit', handleSubmit);
}

// Função de debounce otimizada
function debounce(callback, delay) {
  return function (...args) {
    const context = this;
    clearTimeout(timeouts[args[0]]);
    timeouts[args[0]] = setTimeout(() => callback.apply(context, args), delay);
  };
}

// Funções de validação otimizadas
function validarEmail() {
  const email = elements.emailInput.value.trim();

  if (!email) {
    setInvalid(
      elements.emailInput,
      elements.emailFeedback,
      MESSAGES.emailRequired
    );
    return false;
  }

  if (!emailRegex.test(email)) {
    setInvalid(
      elements.emailInput,
      elements.emailFeedback,
      MESSAGES.emailInvalid
    );
    return false;
  }

  setValid(elements.emailInput);
  return true;
}

function validarSenha() {
  const senha = elements.senhaInput.value;

  if (!senha) {
    setInvalid(
      elements.senhaInput,
      elements.senhaFeedback,
      MESSAGES.senhaRequired
    );
    return false;
  }

  if (senha.length < MIN_SENHA_LENGTH) {
    setInvalid(
      elements.senhaInput,
      elements.senhaFeedback,
      MESSAGES.senhaLength
    );
    return false;
  }

  setValid(elements.senhaInput);
  return true;
}

// Funções de manipulação de estado otimizadas
function setInvalid(input, feedback, message) {
  input.classList.add(CSS_CLASSES.invalid);
  input.classList.remove(CSS_CLASSES.valid);
  feedback.textContent = message;
}

function setValid(input) {
  input.classList.remove(CSS_CLASSES.invalid);
  input.classList.add(CSS_CLASSES.valid);
}

function setLoadingState(isLoading) {
  elements.btnEntrar.classList.toggle(CSS_CLASSES.loading, isLoading);
  elements.btnEntrar
    .querySelector('.spinner-border')
    .classList.toggle(CSS_CLASSES.hidden, !isLoading);
  elements.btnEntrar.disabled = isLoading;
}

// Funções de manipulação de dados otimizadas
function verificarDadosSalvos() {
  const savedEmail = localStorage.getItem(STORAGE_KEYS.email);
  const savedLembrar = localStorage.getItem(STORAGE_KEYS.senha);

  if (savedEmail && savedLembrar === 'true') {
    elements.emailInput.value = savedEmail;
    elements.lembrarSenhaCheckbox.checked = true;
  }
}

function alternarVisibilidadeSenha() {
  const icon = elements.toggleSenhaBtn.querySelector('i');
  const isPassword = elements.senhaInput.type === 'password';

  elements.senhaInput.type = isPassword ? 'text' : 'password';
  icon.classList.toggle('fa-eye', !isPassword);
  icon.classList.toggle('fa-eye-slash', isPassword);
}

// Funções de manipulação de eventos otimizadas
function handleSubmit(event) {
  event.preventDefault();

  // Usa o cache de estado de validação
  if (!validationState.email || !validationState.senha) {
    shakeFeedback();
    return false;
  }

  if (elements.lembrarSenhaCheckbox.checked) {
    localStorage.setItem(STORAGE_KEYS.email, elements.emailInput.value);
    localStorage.setItem(STORAGE_KEYS.senha, 'true');
  } else {
    localStorage.removeItem(STORAGE_KEYS.email);
    localStorage.removeItem(STORAGE_KEYS.senha);
  }

  setLoadingState(true);
  return true;
}

function shakeFeedback() {
  elements.loginForm.classList.add(CSS_CLASSES.shake);
  setTimeout(() => elements.loginForm.classList.remove(CSS_CLASSES.shake), 500);
}

// Função para carregamento lazy de recursos não críticos
function loadNonCriticalResources() {
  // Carrega fontes de forma assíncrona
  const fontLink = document.createElement('link');
  fontLink.rel = 'stylesheet';
  fontLink.href =
    'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&display=swap';
  document.head.appendChild(fontLink);

  // Carrega ícones de forma assíncrona
  const iconLink = document.createElement('link');
  iconLink.rel = 'stylesheet';
  iconLink.href =
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css';
  document.head.appendChild(iconLink);
}

// Função global para exibir mensagens otimizada
window.exibirMensagem = (texto, tipo) => {
  elements.mensagemElement.textContent = texto;
  elements.mensagemElement.classList.remove(
    CSS_CLASSES.success,
    CSS_CLASSES.danger
  );
  elements.mensagemElement.classList.add(`text-${tipo}`);
  setLoadingState(false);
};
