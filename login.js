document.addEventListener('DOMContentLoaded', () => {
  // Elementos do DOM
  const loginForm = document.getElementById('loginForm');
  const emailInput = document.getElementById('email');
  const senhaInput = document.getElementById('senha');
  const lembrarSenhaCheckbox = document.getElementById('lembrarSenha');
  const mensagemElement = document.getElementById('mensagem');
  const btnEntrar = document.getElementById('btnEntrar');
  const toggleSenhaBtn = document.getElementById('toggleSenha');
  const emailFeedback = document.getElementById('emailFeedback');
  const senhaFeedback = document.getElementById('senhaFeedback');

  // Verificar se há dados salvos no localStorage
  verificarDadosSalvos();

  // Adicionar eventos
  toggleSenhaBtn.addEventListener('click', alternarVisibilidadeSenha);
  emailInput.addEventListener('input', validarEmail);
  senhaInput.addEventListener('input', validarSenha);

  // gerenciado pelo auth.js

  // Função para alternar visibilidade da senha
  function alternarVisibilidadeSenha() {
    const icon = toggleSenhaBtn.querySelector('i');

    if (senhaInput.type === 'password') {
      senhaInput.type = 'text';
      icon.classList.remove('fa-eye');
      icon.classList.add('fa-eye-slash');
    } else {
      senhaInput.type = 'password';
      icon.classList.remove('fa-eye-slash');
      icon.classList.add('fa-eye');
    }
  }

  // Função para verificar dados salvos
  function verificarDadosSalvos() {
    const savedEmail = localStorage.getItem('lembrarEmail');
    const savedLembrar = localStorage.getItem('lembrarSenha');

    if (savedEmail && savedLembrar === 'true') {
      emailInput.value = savedEmail;
      lembrarSenhaCheckbox.checked = true;
    }
  }

  // Função para validar email
  function validarEmail() {
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === '') {
      setInvalid(emailInput, emailFeedback, 'O email é obrigatório');
      return false;
    } else if (!emailRegex.test(email)) {
      setInvalid(emailInput, emailFeedback, 'Digite um email válido');
      return false;
    } else {
      setValid(emailInput);
      return true;
    }
  }

  // Função para validar senha
  function validarSenha() {
    const senha = senhaInput.value;

    if (senha === '') {
      setInvalid(senhaInput, senhaFeedback, 'A senha é obrigatória');
      return false;
    } else if (senha.length < 6) {
      setInvalid(
        senhaInput,
        senhaFeedback,
        'A senha deve ter pelo menos 6 caracteres'
      );
      return false;
    } else {
      setValid(senhaInput);
      return true;
    }
  }

  // Função para definir campo como inválido
  function setInvalid(input, feedback, message) {
    input.classList.add('is-invalid');
    input.classList.remove('is-valid');
    feedback.textContent = message;
  }

  // Função para definir campo como válido
  function setValid(input) {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
  }

  // Interceptar o evento de submit original para adicionar validação
  // antes de passar para o auth.js
  const originalSubmitEvent = loginForm.onsubmit;
  loginForm.onsubmit = (event) => {
    // Validar campos
    const emailValido = validarEmail();
    const senhaValida = validarSenha();

    if (!emailValido || !senhaValida) {
      event.preventDefault();
      shakeFeedback();
      return false;
    }

    // Salvar preferência de "lembrar sena"
    if (lembrarSenhaCheckbox.checked) {
      localStorage.setItem('lembrarEmail', emailInput.value);
      localStorage.setItem('lembrarSenha', 'true');
    } else {
      localStorage.removeItem('lembrarEmail');
      localStorage.removeItem('lembrarSenha');
    }

    // Mostrar estado de carregamento
    setLoadingState(true);

    // Continuar com o evento original
    return true;
  };

  // Function para exibir mensagem (pode ser usada pelo auth.js)
  window.exibirMensagem = (texto, tipo) => {
    mensagemElement.textContent = texto;

    // Limpar clasesses
    mensagemElement.classList.remove('text-success', 'text-danger');

    if (tipo === 'success') {
      mensagemElement.classList.add('text-success');
    } else if (tipo === 'error') {
      mensagemElement.classList.add('text-danger');
    }

    // Dstv estado de carregamento
    setLoadingState(false);
  };

  // Função para definir estado de carregamento
  function setLoadingState(isLoading) {
    if (isLoading) {
      btnEntrar.classList.add('loading');
      btnEntrar.querySelector('.spinner-border').classList.remove('d-none');
      btnEntrar.disabled = true;
    } else {
      btnEntrar.classList.remove('loading');
      btnEntrar.querySelector('.spinner-border').classList.add('d-none');
      btnEntrar.disabled = false;
    }
  }

  // Função para efeito de shake no formulário
  function shakeFeedback() {
    loginForm.classList.add('shake');
    setTimeout(() => {
      loginForm.classList.remove('shake');
    }, 500);
  }
});
