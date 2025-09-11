import { User } from '../models/users.js';
import { Hash } from '../models/hashing.js'
import { pool } from '../server.js';
import express from "express";
const router = express.Router();

router.get("/register", (req, res) => {
  res.sendFile(process.cwd() + "/pages/register.html");
});

router.get("/login", (req, res) => {
  res.sendFile(process.cwd() + "/pages/login.html");
});

export default router;
