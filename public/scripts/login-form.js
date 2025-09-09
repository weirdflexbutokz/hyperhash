document.getElementById('login-form').addEventListener('submit', async function (e) {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  try {
    const res = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
      credentials: 'include' // Permite enviar y recibir cookies de sesión
    });
    const data = await res.json();
    console.log(data);
    if (res.ok && data.message === 'Login exitoso') {
      window.location.href = '/';
    } else {
      alert(data.error || 'Error en login');
    }
  } catch (err) {
    console.error('Error en login:', err);
  }
});
