import express from 'express';
import { Hash } from '../models/hashing.js';
import { pool } from '../server.js';

const router = express.Router();
// TODO añadir autenticacion a endpoints
router.get('/hashes', async (req, res) => {
  try {
    const hashes = await Hash.getUncracked(pool);
    res.json(hashes);
  } catch (err) {
    res.status(500).json({ error: 'Error obteniendo hashes' });
  }
});

router.get('/leaderboard', async (req, res) => {
  try {
    const leaderboard = await Hash.getLeaderBoard(pool);
    res.json(leaderboard);
  } catch (err) {
    res.status(500).json({ error: 'Error obteniendo leaderboard' });
  }
});

router.post('/crack', async (req, res) => {
  const { hash, password } = req.body;
  const playerName = req.session.username;
  const resultado = await Hash.trySolve(pool, playerName, hash, password);
  console.log(resultado)
  //TODO: actualizar resultados en io
  res.json({ resultado });
});

export default router;