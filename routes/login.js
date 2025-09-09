import { User } from '../models/users.js';
import { Hash } from '../models/hashing.js'
import { pool } from '../server.js';
import express from "express";
const router = express.Router();

// POST /login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const hashed = Hash.encryptMD5(password);
  console.log("Credenciales", { username, password, hashed });
  try {
    const user = await User.authenticate(pool, username, hashed);
    if (!user || user.length === 0) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    console.log(user)
    req.session.userId = user[0].id;
    req.session.save(() => {
      res.json({ message: 'Login exitoso', user: { id: user[0].id, name: user[0].name } });
    });
  } catch (err) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

export default router;
