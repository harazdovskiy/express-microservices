const redis = require("redis");
<<<<<<< HEAD
const { TOKENS_REDIS_URI, TOKENS_REDIS_PORT, SECRET, INVITE_EXPIRES_IN } = process.env;
const jwt = require("jsonwebtoken");
const moment = require("moment");
const { promisify } = require("util");

class TokenService {
  constructor({ port, host, secret, expiresIn }) {
    this.tokenDb = redis.createClient({ host, port });
    this.secret = secret;
    this.expiresIn = expiresIn;

    this.asyncHMSET = promisify(this.tokenDb.HMSET);
  }

  async generateToken(userId) {
    try {
      const token = jwt.sign({ data: { userId } }, this.secret, {
        expiresIn: this.expiresIn
      });

      const createdAt = moment().format();
      const lastLogin = createdAt();
      const data = ["createdAt", createdAt, "lastLogin", lastLogin];
      const res = await this.asyncHMSET(`${userId}:${token}`, data);

      return res;
    } catch (error) {
      console.log({ error });
    }
  }
}

module.exports = new TokenService({
  host: TOKENS_REDIS_URI,
  port: TOKENS_REDIS_PORT,
  secret: SECRET,
  expiresIn: INVITE_EXPIRES_IN
});
=======
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
>>>>>>> 43d02da0cf28b5d7d5746f358408c2c7b22184f5
