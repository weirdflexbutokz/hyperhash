import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { createPool } from './db/pool.js';
import morgan from 'morgan';
import { setupRedisSession } from './middleware/redisSession.js';
import dotenv from 'dotenv';
import { Hash } from "./models/hashing.js"
dotenv.config();

const app = express();
const server = http.createServer(app);
export { server };
const io = new Server(server);
const pool = await createPool();
setupRedisSession(app);

app.use(express.static("public"));
app.use(express.json());
app.use(morgan(process.env.LOG_LEVEL || 'combined'));

import registerRouter from "./routes/register.js";
import loginRouter from "./routes/login.js";
import pagesRouter from "./routes/pages.js";
import apiRouter from "./routes/api.js";
app.use(pagesRouter);
app.use(registerRouter);
app.use(loginRouter);
app.use('/api', apiRouter);

io.on('connection', async (socket) => {
  console.log("Cliente conectado");
  const hashes = await Hash.getUncracked(pool);
  //send just id. hash and points
  const hashes_output = hashes.map(hash => ({
    id: hash.id,
    hash: hash.hash,
    points: hash.points,
    mode: hash.mode
  }));
  console.log(hashes_output);
  socket.emit('hashes', hashes_output);
});

const PORT = process.env.PORT;
const HOST = process.env.HOST;
server.listen(PORT, () => {
  console.log(`Servidor escuchando en http://${HOST}:${PORT}`);
});

export { pool, io };