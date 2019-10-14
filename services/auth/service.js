const redis = require("redis");
const { TOKENS_REDIS_URI } = process.env;

class TokenService {
  constructor({ port, host }) {
    this.client = redis.createClient({
      port,
      host,
      socket_keepalive: true
    });
  }

  generateToken(userId) {
    this.client.hg;
  }
}

module.exports = new TokenService({ host: TOKENS_REDIS_URI, port: 6379 });
