import { expect } from 'chai';
import fetch from 'node-fetch';

describe('Registro de usuario', () => {
  it('debería registrar un usuario correctamente', async () => {
    const username = 'testuser';
    const password = 'password123';
    const res = await fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    expect(res.status).to.equal(201);
    const text = await res.text();
    expect(text).to.equal('User registered');

    // Elimina el usuario tras el test usando el modelo User
    // Requiere acceso al pool de la base de datos
    const { User } = await import('../models/users.js');
    const { createPool } = await import('../db/pool.js');
    const pool = await createPool();
    await User.deleteByName(pool, username);
    await pool.end();
  });

  // Puedes agregar más tests para casos de error, usuario existente, etc.
});
