// Cache de elementos e constantes
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

// Cache de regex e constantes
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_SENHA_LENGTH = 6;
const DEBOUNCE_DELAY = 300;

// Cache de classes CSS
const CSS_CLASSES = {
  invalid: 'is-invalid',
  valid: 'is-valid',
  loading: 'loading',
  shake: 'shake',
  hidden: 'd-none',
  success: 'text-success',
  danger: 'text-danger',
};

// Cache de mensagens
const MESSAGES = {
  emailRequired: 'O email é obrigatório',
  emailInvalid: 'Digite um email válido',
  senhaRequired: 'A senha é obrigatória',
  senhaLength: 'A senha deve ter pelo menos 6 caracteres',
};

// Cache de localStorage keys
const STORAGE_KEYS = {
  email: 'lembrarEmail',
  senha: 'lembrarSenha',
};

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  verificarDadosSalvos();
  setupEventListeners();
});

// Configuração de eventos
function setupEventListeners() {
  let emailTimeout, senhaTimeout;

  elements.emailInput.addEventListener('input', () => {
    clearTimeout(emailTimeout);
    emailTimeout = setTimeout(validarEmail, DEBOUNCE_DELAY);
  });

  elements.senhaInput.addEventListener('input', () => {
    clearTimeout(senhaTimeout);
    senhaTimeout = setTimeout(validarSenha, DEBOUNCE_DELAY);
  });

  elements.toggleSenhaBtn.addEventListener('click', alternarVisibilidadeSenha);
  elements.loginForm.onsubmit = handleSubmit;
}

// Funções de validação
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

// Funções de manipulação de estado
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

// Funções de manipulação de dados
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

// Funções de manipulação de eventos
function handleSubmit(event) {
  const emailValido = validarEmail();
  const senhaValida = validarSenha();

  if (!emailValido || !senhaValida) {
    event.preventDefault();
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

// Função global para exibir mensagens
window.exibirMensagem = (texto, tipo) => {
  elements.mensagemElement.textContent = texto;
  elements.mensagemElement.classList.remove(
    CSS_CLASSES.success,
    CSS_CLASSES.danger
  );
  elements.mensagemElement.classList.add(`text-${tipo}`);
  setLoadingState(false);
};
