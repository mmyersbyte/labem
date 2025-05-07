// Script para carregar e exibir os encontros na tela do painel do ligante
const API_ENCONTROS = 'https://labem.onrender.com/api/encontros';
const grid = document.getElementById('encontros-grid');

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

async function carregarEncontrosLigante() {
  if (!grid) return;
  grid.innerHTML = '<p style="color:#146677">Carregando encontros...</p>';
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
      grid.innerHTML = '';
      data.encontros.forEach((encontro) => {
        grid.innerHTML += criarCardLigante(encontro);
      });
    } else {
      grid.innerHTML =
        '<p style="color:#146677">Nenhum encontro cadastrado.</p>';
    }
  } catch (err) {
    grid.innerHTML = '<p style="color:red">Erro ao carregar encontros.</p>';
    console.error('Erro ao carregar encontros:', err);
  }
}

window.addEventListener('DOMContentLoaded', carregarEncontrosLigante);
