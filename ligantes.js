// Verifica se o navegador suporta PWA
if ('serviceWorker' in navigator && 'BeforeInstallPromptEvent' in window) {
    let deferredPrompt;
  
    // Evento para capturar a instalação
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
  
      // Mostra o botão de instalação
      const addBtn = document.getElementById('addToHomeScreen');
      addBtn.style.display = 'block';
  
      // Evento de clique no botão
      addBtn.addEventListener('click', () => {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('Usuário aceitou instalar o PWA');
          }
          deferredPrompt = null;
        });
      });
    });
  
    // Registra o Service Worker
    navigator.serviceWorker.register('service-worker.js')
      .then(() => console.log('Service Worker registrado com sucesso!'))
      .catch((err) => console.error('Erro ao registrar Service Worker:', err));
  }