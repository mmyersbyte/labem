document.addEventListener('DOMContentLoaded', () => {
  // Cache de elementos do DOM
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

  // Verificar dados salvos
  verificarDadosSalvos();

  // Adicionar eventos com debounce para validação
  let emailTimeout;
  let senhaTimeout;

  elements.emailInput.addEventListener('input', () => {
    clearTimeout(emailTimeout);
    emailTimeout = setTimeout(validarEmail, 300);
  });

  elements.senhaInput.addEventListener('input', () => {
    clearTimeout(senhaTimeout);
    senhaTimeout = setTimeout(validarSenha, 300);
  });

  elements.toggleSenhaBtn.addEventListener('click', alternarVisibilidadeSenha);

  function alternarVisibilidadeSenha() {
    const icon = elements.toggleSenhaBtn.querySelector('i');
    const isPassword = elements.senhaInput.type === 'password';

    elements.senhaInput.type = isPassword ? 'text' : 'password';
    icon.classList.toggle('fa-eye', !isPassword);
    icon.classList.toggle('fa-eye-slash', isPassword);
  }

  function verificarDadosSalvos() {
    const savedEmail = localStorage.getItem('lembrarEmail');
    const savedLembrar = localStorage.getItem('lembrarSenha');

    if (savedEmail && savedLembrar === 'true') {
      elements.emailInput.value = savedEmail;
      elements.lembrarSenhaCheckbox.checked = true;
    }
  }

  function validarEmail() {
    const email = elements.emailInput.value.trim();

    if (!email) {
      setInvalid(
        elements.emailInput,
        elements.emailFeedback,
        'O email é obrigatório'
      );
      return false;
    }

    if (!emailRegex.test(email)) {
      setInvalid(
        elements.emailInput,
        elements.emailFeedback,
        'Digite um email válido'
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
        'A senha é obrigatória'
      );
      return false;
    }

    if (senha.length < MIN_SENHA_LENGTH) {
      setInvalid(
        elements.senhaInput,
        elements.senhaFeedback,
        'A senha deve ter pelo menos 6 caracteres'
      );
      return false;
    }

    setValid(elements.senhaInput);
    return true;
  }

  function setInvalid(input, feedback, message) {
    input.classList.add('is-invalid');
    input.classList.remove('is-valid');
    feedback.textContent = message;
  }

  function setValid(input) {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
  }

  // Interceptar submit
  elements.loginForm.onsubmit = (event) => {
    const emailValido = validarEmail();
    const senhaValida = validarSenha();

    if (!emailValido || !senhaValida) {
      event.preventDefault();
      shakeFeedback();
      return false;
    }

    // Salvar preferências
    if (elements.lembrarSenhaCheckbox.checked) {
      localStorage.setItem('lembrarEmail', elements.emailInput.value);
      localStorage.setItem('lembrarSenha', 'true');
    } else {
      localStorage.removeItem('lembrarEmail');
      localStorage.removeItem('lembrarSenha');
    }

    setLoadingState(true);
    return true;
  };

  window.exibirMensagem = (texto, tipo) => {
    elements.mensagemElement.textContent = texto;
    elements.mensagemElement.classList.remove('text-success', 'text-danger');
    elements.mensagemElement.classList.add(`text-${tipo}`);
    setLoadingState(false);
  };

  function setLoadingState(isLoading) {
    elements.btnEntrar.classList.toggle('loading', isLoading);
    elements.btnEntrar
      .querySelector('.spinner-border')
      .classList.toggle('d-none', !isLoading);
    elements.btnEntrar.disabled = isLoading;
  }

  function shakeFeedback() {
    elements.loginForm.classList.add('shake');
    setTimeout(() => elements.loginForm.classList.remove('shake'), 500);
  }
});
