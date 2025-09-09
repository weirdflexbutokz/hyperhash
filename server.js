import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import mysql from 'mysql2/promise';
import { Hash } from './models/hashing.js';
import registerRouter from "./routes/register.js";
import loginRouter from "./routes/login.js";
import session from 'express-session';
import { createClient } from 'redis';

// Definicion de variables
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Conexion BBDD
const pool = mysql.createPool({
  host: 'localhost',
  user: 'datadiego',
  password: '1337',
  database: 'hyperhash',
});

// Configuracion Express
app.use(express.static("public"));
app.use(express.json());

const redisClient = createClient();
redisClient.connect().catch(console.error);

// Para ES Modules, usa la clase directamente desde el paquete:
const { RedisStore } = await import('connect-redis');

const store = new RedisStore({ client: redisClient });
app.use(session({
  store,
  secret: 'tu_secreto_seguro',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, httpOnly: true, maxAge: 86400000 }
}));

// Rutas
app.use(registerRouter);
app.use(loginRouter);

// WebSocket
io.on('connection', async (socket) => {
  console.log("Cliente conectado")
  const hashes = await Hash.getUncracked(pool);
  socket.emit('hashes', hashes);
});

// Listen
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

export { pool }