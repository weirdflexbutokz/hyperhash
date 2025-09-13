const socket = io();

document.addEventListener('DOMContentLoaded', function () {
  const lastCracked = document.getElementById('last-cracked');

  socket.on('hashes', hashes => {
    const list = document.getElementById('hashes');
    if (!list) return;
    list.innerHTML = '';
    const grouped = {};
    hashes.forEach(h => {
      if (!grouped[h.mode]) grouped[h.mode] = [];
      grouped[h.mode].push(h);
    });
    Object.entries(grouped).forEach(([mode, hashes]) => {
      const modeHeader = document.createElement('h3');
      modeHeader.textContent = `Modo: ${mode}`;
      list.appendChild(modeHeader);
      const ul = document.createElement('ul');
      hashes.forEach(h => {
        const li = document.createElement('li');
        li.textContent = `${h.hash} - ${h.points} puntos`;
        ul.appendChild(li);
      });
      list.appendChild(ul);
    });
  });

  socket.on('hashCracked', ({ playerName, hash, password }) => {
    if (lastCracked) {
      lastCracked.textContent = `${playerName} ha roto el hash ${hash} con la contraseña ${password}`;
    }
  });

  const form = document.getElementById('hash-form');
  if (form) {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const input = document.getElementById('input-text');
      const value = input.value.trim();
      const [hash, password] = value.split(':');
      if (input && value) {
        await fetch('/api/crack', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ hash, password })
        });
        input.value = '';
      }
    });
  }
});