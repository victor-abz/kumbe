import expressSession from 'express-session';
import connectRedis from 'connect-redis';
import redis from 'redis';
import { hour } from '../helpers/constants';

const RedisStore = connectRedis(expressSession);
const redisClient = redis.createClient();

const redisSessionStore = new RedisStore({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  prefix: process.env.REDIS_PREFIX,
  name: process.env.REDIS_NAME,
  client: redisClient,
});

export const session = () =>
  expressSession({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    name: process.env.SESSION_NAME,
    cookie: {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * hour,
      domain: process.env.BASE_URL,
    },
    store: redisSessionStore,
  });
