// utilities/registerUser.js
// Función para registrar un usuario en el servidor local usando fetch

/**
 * Registra un usuario en el servidor local
 * @param {string} username - Nombre de usuario
 * @param {string} password - Contraseña
 * @returns {Promise<object>} - Respuesta del servidor
 */
export async function registerUser(username, password) {
  const response = await fetch('http://localhost:3000/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });
  return response.text();
}
