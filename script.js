document.getElementById('formulario-contato').addEventListener('submit', function (e) {
  e.preventDefault();

  const formData = {
    nome: document.getElementById('nome-unico').value,
    email: document.getElementById('email-unico').value,
    assunto: document.getElementById('assunto-unico').value,
    mensagem: document.getElementById('mensagem-unico').value,
  };

  // Use a URL correta do backend (com a rota /contato)
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