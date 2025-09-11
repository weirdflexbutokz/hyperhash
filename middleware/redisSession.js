import { createClient } from 'redis';
const { RedisStore } = (await import('connect-redis'));
import session from 'express-session';

export function setupRedisSession(app) {
  const redisClient = createClient({
    socket: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT
    },
    // password: process.env.REDIS_SECRET // Añadir contraseña si está configurada en Redis
  });
  redisClient.connect().catch(console.error);

  const store = new RedisStore({ client: redisClient });
  app.use(session({
    store,
    secret: process.env.REDIS_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true, maxAge: 86400000 }
  }));
}
