import express from 'express';
import { Hash } from '../models/hashing.js';
import { pool } from '../server.js';

const router = express.Router();

// Endpoint para obtener hashes sin resolver
router.get('/hashes', async (req, res) => {
  try {
    const hashes = await Hash.getUncracked(pool);
    res.json(hashes);
  } catch (err) {
    res.status(500).json({ error: 'Error obteniendo hashes' });
  }
});

// Endpoint para obtener el leaderboard
router.get('/leaderboard', async (req, res) => {
  try {
    const leaderboard = await Hash.getLeaderBoard(pool);
    res.json(leaderboard);
  } catch (err) {
    res.status(500).json({ error: 'Error obteniendo leaderboard' });
  }
});

export default router;
