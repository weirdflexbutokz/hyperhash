// Simple client for Socket.IO y Express
const socket = io();

socket.on('hashes', hashes => {
  const list = document.getElementById('hashes');
  if (!list) return;
  list.innerHTML = '';
  hashes.forEach(h => {
    const li = document.createElement('li');
    li.textContent = `${h.hash} (${h.algo}) - ${h.points} puntos`;
    list.appendChild(li);
  });
});

window.onload = () => {
  const hashList = document.getElementById('hash-list');

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
        //TODO: Manejar la respuesta de /crack
      }
    });
  }
};