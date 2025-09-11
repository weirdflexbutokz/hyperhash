import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { createPool } from './db/pool.js';
import { Hash } from './models/hashing.js';
import morgan from 'morgan';
import { setupRedisSession } from './middleware/redisSession.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const pool = await createPool();
setupRedisSession(app);

app.use(express.static("public"));
app.use(express.json());
app.use(morgan(process.env.LOG_LEVEL || 'combined'));

import registerRouter from "./routes/register.js";
import loginRouter from "./routes/login.js";
import pagesRouter from "./routes/pages.js";
app.use(pagesRouter);
app.use(registerRouter);
app.use(loginRouter);

io.on('connection', async (socket) => {
  console.log("Cliente conectado")
  const hashes = await Hash.getUncracked(pool);
  socket.emit('hashes', hashes);
});

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';
server.listen(PORT, () => {
  console.log(`Servidor escuchando en http://${HOST}:${PORT}`);
});

export { pool };