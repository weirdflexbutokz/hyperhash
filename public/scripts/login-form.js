document.getElementById('login-form').addEventListener('submit', async function(e) {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  try {
    const res = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    // Maneja la respuesta aquí (redirección, mostrar error, etc.)
    console.log(data);
  } catch (err) {
    console.error('Error en login:', err);
  }
});
