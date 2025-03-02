document.getElementById('formulario-contato').addEventListener('submit', function (e) {
  e.preventDefault(); // Impede o envio padrão do formulário

  // Coleta os dados do formulário
  const formData = {
    nome: document.getElementById('nome-unico').value,
    email: document.getElementById('email-unico').value,
    assunto: document.getElementById('assunto-unico').value,
    mensagem: document.getElementById('mensagem-unico').value,
  };

  // Envia os dados para o backend
  fetch('https://labem-backend.onrender.com/contato', {
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
      // Exibe o pop-up de confirmação
      Swal.fire({
        icon: 'success',
        title: 'Contato enviado!',
        text: 'Sua mensagem foi enviada com sucesso.',
      });
  
      // Limpa os campos do formulário
      document.getElementById('formulario-contato').reset();
    })
    .catch((error) => {
      console.error('Erro:', error);
      alert('Ocorreu um erro ao enviar o contato. Tente novamente.');
    });
});
