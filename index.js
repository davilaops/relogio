let manualTheme = null; // null = automático, 'light' ou 'dark'

function updateClock() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  const s = String(now.getSeconds()).padStart(2, '0');
  document.getElementById('clock').textContent = `${h}:${m}:${s}`;
}

function applyTheme(mode) {
  const root = getComputedStyle(document.documentElement);
  const isLight = mode === 'light';
  document.body.style.backgroundColor = isLight ? root.getPropertyValue('--light-bg') : root.getPropertyValue('--dark-bg');
  document.body.style.color = isLight ? root.getPropertyValue('--light-text') : root.getPropertyValue('--dark-text');
}

function autoTheme() {
  if (manualTheme !== null) return; // não aplicar se o usuário escolheu manualmente
  const hour = new Date().getHours();
  const mode = (hour >= 6 && hour < 18) ? 'light' : 'dark';
  applyTheme(mode);
}

function toggleTheme() {
  if (manualTheme === null) {
    const currentBg = getComputedStyle(document.body).backgroundColor;
    manualTheme = currentBg.includes('244') ? 'dark' : 'light'; // detecta tema atual
  }

  manualTheme = (manualTheme === 'light') ? 'dark' : 'light';
  applyTheme(manualTheme);
}

// Inicialização
updateClock();
autoTheme();
setInterval(() => {
  updateClock();
  autoTheme();
}, 1000);
