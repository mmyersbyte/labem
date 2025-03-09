document.getElementById('formulario-contato').addEventListener('submit', function (e) {
  e.preventDefault();

  const formData = {
    nome: document.getElementById('nome-unico').value,
    email: document.getElementById('email-unico').value,
    assunto: document.getElementById('assunto-unico').value,
    mensagem: document.getElementById('mensagem-unico').value,
  };

  fetch('https://labem.onrender.com/contato', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error('Erro ao enviar o contato');
    }
    return response.json();
  })
  .then((data) => {
    Swal.fire({
      icon: 'success',
      title: 'Contato enviado!',
      text: 'Sua mensagem foi enviada com sucesso.',
    });
    document.getElementById('formulario-contato').reset();
  })
  .catch((error) => {
    console.error('Erro:', error);
    alert('Ocorreu um erro ao enviar o contato. Tente novamente.');
  });
});

// btn
(function() {
  var css = `
    .instagram-float-btn {
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 60px;
      height: 60px;
      background: linear-gradient(45deg, #feda75, #d62976, #4f5bd5);
      border: none;
      border-radius: 50%;
      box-shadow: 0 4px 8px rgba(0,0,0,0.2);
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      z-index: 1000;
      transition: transform 0.3s ease;
    }
    .instagram-float-btn:hover {
      transform: scale(1.05);
    }
    .instagram-float-btn svg {
      width: 28px;
      height: 28px;
    }
    @media (min-width: 768px) {
      .instagram-float-btn {
        bottom: 30px;
        right: 30px;
        width: 70px;
        height: 70px;
      }
    }
  `;
  var styleEl = document.createElement('style');
  styleEl.type = 'text/css';
  styleEl.appendChild(document.createTextNode(css));
  document.head.appendChild(styleEl);

  // Cria o botão flutuante
  var button = document.createElement('button');
  button.className = 'instagram-float-btn';
  button.setAttribute('aria-label', 'Instagram');

  // Ícone minimalista e moderno do Instagram em SVG
  button.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <rect x="3" y="3" width="18" height="18" rx="4" ry="4" fill="none" stroke="#fff" stroke-width="2"/>
      <circle cx="12" cy="12" r="4" fill="none" stroke="#fff" stroke-width="2"/>
      <circle cx="17" cy="7" r="1" fill="#fff"/>
    </svg>
  `;

  // Evento para redirecionar ao clicar no botão, abrindo em uma nova aba
  button.addEventListener('click', function() {
    window.open('https://www.instagram.com/seuperfil', '_blank'); // Substitua pelo seu perfil
  });

  // Adiciona o botão ao documento
  document.body.appendChild(button);
})();
