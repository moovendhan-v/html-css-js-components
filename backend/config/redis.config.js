import redis from 'redis';
import logger from '../utils/logger.js';

// Initialize Redis client
const redisClient = redis.createClient({
  socket: {
    host: '172.28.0.3',
    port: 6379 // Default Redis port, change if different
  }
});

redisClient.on('error', err => console.log('Redis Client Error', err));

redisClient.connect().then(() => {
  logger.info('Redis client connected');
}).catch(err => {
  console.error('Failed to connect to Redis', err);
});


export default redisClient;