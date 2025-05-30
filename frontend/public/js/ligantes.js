// Verifica se o usuário está autenticado ao carregar a página
const token = localStorage.getItem('token');
if (!token) {
  window.location.href = 'login.html';
  // window.location.href = 'index.html';
}

// Script para carregar e exibir os encontros na tela do painel do ligante
const API_ENCONTROS = 'https://labem.onrender.com/api/encontros';
const grid = document.getElementById('encontros-grid');
const LS_KEY = 'encontrosLigante';

function criarCardLigante(encontro) {
  const slideUrl = `https://labem.onrender.com/api/encontros/${encontro._id}/slide`;
  const materialUrl = `https://labem.onrender.com/api/encontros/${encontro._id}/material`;
  return `
    <div class="encontro-card">
      <div class="card-header">
        <h2>${encontro.titulo}</h2>
        <i class="fas fa-book-open"></i>
      </div>
      <div class="card-content">
        <a href="${slideUrl}" class="download-btn" target="_blank">
          <i class="fas fa-file-pdf"></i>
          Slides Teóricos
          <span class="file-size">PDF</span>
        </a>
        <a href="${materialUrl}" class="download-btn" target="_blank">
          <i class="fas fa-file-alt"></i>
          Material de Apoio
          <span class="file-size">PDF</span>
        </a>
      </div>
      <div class="card-footer">
        <span class="progress-text">${encontro.paragrafo}</span>
        <div class="progress-bar">
          <div class="progress" style="width: 25%"></div>
        </div>
      </div>
    </div>
  `;
}

function mostrarLoading() {
  grid.innerHTML = `
    <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;padding:2rem 0;">
      <div class="spinner" style="width:40px;height:40px;border:4px solid #146677;border-top:4px solid #b3e0ff;border-radius:50%;animation:spin 1s linear infinite;"></div>
      <p style="color:#146677;margin-top:1rem;">Carregando encontros...</p>
    </div>
    <style>@keyframes spin{0%{transform:rotate(0deg);}100%{transform:rotate(360deg);}}</style>
  `;
}

function renderizarEncontros(encontros) {
  if (!encontros || encontros.length === 0) {
    grid.innerHTML = '<p style="color:#146677">Nenhum encontro cadastrado.</p>';
    return;
  }
  grid.innerHTML = '';
  encontros.forEach((encontro) => {
    grid.innerHTML += criarCardLigante(encontro);
  });
}

async function carregarEncontrosLigante() {
  if (!grid) return;

  // 1. Tenta exibir do localStorage imediatamente
  const cache = localStorage.getItem(LS_KEY);
  if (cache) {
    try {
      const encontrosCache = JSON.parse(cache);
      renderizarEncontros(encontrosCache);
    } catch (e) {
      localStorage.removeItem(LS_KEY);
    }
  } else {
    mostrarLoading();
  }

  // 2. Busca do backend e atualiza localStorage
  try {
    const res = await fetch(API_ENCONTROS);
    if (!res.ok) {
      grid.innerHTML =
        '<p style="color:red">Erro ao carregar encontros (HTTP ' +
        res.status +
        ').</p>';
      return;
    }
    const data = await res.json();
    if (data.success && data.encontros.length > 0) {
      renderizarEncontros(data.encontros);
      localStorage.setItem(LS_KEY, JSON.stringify(data.encontros));
    } else {
      grid.innerHTML =
        '<p style="color:#146677">Nenhum encontro cadastrado.</p>';
      localStorage.removeItem(LS_KEY);
    }
  } catch (err) {
    grid.innerHTML = '<p style="color:red">Erro ao carregar encontros.</p>';
    console.error('Erro ao carregar encontros:', err);
  }
}

window.addEventListener('DOMContentLoaded', carregarEncontrosLigante);
