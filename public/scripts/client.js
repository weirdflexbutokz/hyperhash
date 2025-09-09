// Simple client for Socket.IO y Express
const socket = io();

socket.on('hashes', hashes => {
  const list = document.getElementById('hash-list');
  list.innerHTML = '';
  hashes.forEach(h => {
    const li = document.createElement('li');
    li.textContent = `${h.hash} (${h.algo}) - ${h.points} puntos`;
    list.appendChild(li);
  });
});

window.onload = () => {
  document.body.innerHTML = '<h2>Hashes sin romper</h2><ul id="hash-list"></ul>';
};