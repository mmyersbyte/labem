document.addEventListener("DOMContentLoaded", function() {
    let botao = document.createElement("a");
    botao.href = "https://www.instagram.com/labemunisul/?api=1%2F&hl=zh-cn";
    botao.target = "_blank";
    botao.className = "instagram-float";
    
    let icon = document.createElement("i");
    icon.className = "fab fa-instagram";
    
    botao.appendChild(icon);
    document.body.appendChild(botao);
    
    let style = document.createElement("style");
    style.innerHTML = `
        .instagram-float {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888);
            color: white;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            text-decoration: none;
            transition: transform 0.3s ease;
            z-index: 9999;
           
        }
        .instagram-float:hover {
            transform: scale(1.1);
            opacity: 0.9;
        }
        .instagram-float i {
            font-size: 28px;
        }
    `;
    document.head.appendChild(style);
});
///

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
    .then((response) => response.text())
    .then((data) => {
      // Exibe o pop-up de confirmação
      Swal.fire({
        icon: 'success',
        title: 'Contato enviado!',
        text: 'Sua mensagem foi enviada com sucesso.',
      });

      // Limpa o campo de mensagem
      document.getElementById('mensagem-unico').value = '';

      // (Opcional) Limpa todos os campos do formulário
      document.getElementById('nome-unico').value = '';
      document.getElementById('email-unico').value = '';
      document.getElementById('assunto-unico').value = '';
    })
    .catch((error) => {
      console.error('Erro:', error);
      alert('Ocorreu um erro ao enviar o contato. Tente novamente.');
    });
});