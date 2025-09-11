import express from "express";
import { requireAuth } from '../middleware/auth.js';
const router = express.Router();

router.get("/register", (req, res) => {
  res.sendFile(process.cwd() + "/pages/register.html");
});

router.get("/login", (req, res) => {
  res.sendFile(process.cwd() + "/pages/login.html");
});

router.get("/", requireAuth, (req, res) => {
  res.sendFile(process.cwd() + "/pages/hyperhash.html");
});

router.get("/leaderboard", requireAuth, (req, res) => {
  res.sendFile(process.cwd() + "/pages/leaderboard.html");
});

export default router;
