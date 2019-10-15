const redis = require("redis");
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
