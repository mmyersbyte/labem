// auth.js
document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();
  
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const mensagem = document.getElementById('mensagem');
  
    try {
      const response = await fetch('https://labem-2.onrender.com/login', { // URL do Render
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
      });
  
      const data = await response.json();
      console.log('Resposta do servidor:', data);
  
      if (data.success) {
        // Armazena o token JWT no localStorage para uso em requisições protegidas
        localStorage.setItem('token', data.token);
        // Redireciona para a página secreta ou painel
        window.location.href = 'painel-do-ligante.html';
      } else {
        mensagem.textContent = data.error || 'Erro ao fazer login';
      }
    } catch (error) {
      console.error('Erro:', error);
      mensagem.textContent = 'Erro ao conectar ao servidor';
    }
  });
  
