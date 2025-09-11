import { User } from '../models/users.js';
import { Hash } from '../models/hashing.js'
import { pool } from '../server.js';
import express from "express";
const router = express.Router();

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.authenticate(pool, username, password); // bcrypt compara internamente
    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    req.session.userId = user.id;
    req.session.username = username;
    res.json({ message: 'Login exitoso', user: { id: user.id, name: user.name } });
  } catch (err) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

export default router;
