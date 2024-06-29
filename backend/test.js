const redis = require('redis');
const client = redis.createClient({
  socket: {
    host: '172.28.0.3',
    port: 6379 // Default Redis port, change if different
  }
});

client.on('error', err => console.log('Redis Client Error', err));

client.connect().then(() => {
  console.log('Connected to Redis');
  // You can perform Redis operations here
}).catch(err => {
  console.error('Failed to connect to Redis', err);
});
 