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

    const { User } = await import('../models/users.js');
    const { createPool } = await import('../db/pool.js');
    const pool = await createPool();
    await User.deleteByName(pool, username);
    await pool.end();
  });

});
