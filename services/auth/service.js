const redis = require("redis");
const { TOKENS_REDIS_URI, TOKENS_REDIS_PORT, SECRET, INVITE_EXPIRES_IN } = process.env;
const jwt = require("jsonwebtoken");
const moment = require("moment");
const { promisify } = require("util");
const crypto = require("crypto");

class TokenService {
  constructor({ port, host, secret, expiresIn }) {
    this.tokenDb = redis.createClient({ host, port });
    this.secret = secret;
    this.expiresIn = expiresIn;

    this.asyncHMSET = promisify(this.tokenDb.HMSET).bind(this.tokenDb);
    this.asyncHGETALL = promisify(this.tokenDb.HGETALL).bind(this.tokenDb);
    this.asyncKEYS = promisify(this.tokenDb.KEYS).bind(this.tokenDb);
    this.asyncHSET = promisify(this.tokenDb.HSET).bind(this.tokenDb);
  }

  getKeysByToken(token) {
    return this.asyncKEYS(`*:${token}:*`);
  }

  getKeysByRefreshToken(refreshToken) {
    return this.asyncKEYS(`*:${refreshToken}`);
  }

  getSessionData(key) {
    return this.asyncHGETALL(key);
  }

  setSessionData(key, hashKey, value) {
    return this.asyncHSET(key, hashKey, value);
  }

  saveTokenData(userId, token, refreshToken) {
    const now = moment().format();
    const data = ["createdAt", now, "lastUsed", now, "valid", true];

    return this.asyncHMSET(`${userId}:${token}:${refreshToken}`, data);
  }

  async generateToken(userId) {
    try {
      const token = jwt.sign({ data: { userId } }, this.secret, {
        expiresIn: this.expiresIn
      });

      const refreshToken = crypto.randomBytes(16).toString("hex");

      const res = await this.saveTokenData(userId, token, refreshToken);

      if (res !== "OK") throw new Error(res);

      return { token, refreshToken };
    } catch (error) {
      console.log({ error });
      throw new Error(`Token generation failed: ${error.message}`);
    }
  }

  async validateToken(token) {
    try {
      const data = jwt.verify(token, this.secret);

      if (!data) return false;

      const results = await this.getKeysByToken(token);

      if (!results) return false;

      const [key] = results;

      const tokenData = await this.getSessionData(key);

      if (tokenData.valid === "false") throw new Error("token was was terminated");

      this.setSessionData(key, "lastUsed", moment().format());

      return {
        userId: data.userId,
        tokenData
      };
    } catch (error) {
      console.log({ error });
      throw new Error(`Token validation failed: ${error.message}`);
    }
  }

  async refreshToken(refreshToken) {
    try {
      const results = await this.getKeysByRefreshToken(refreshToken);
      if (!results) return false;
      const [key] = results;
      const tokenData = await this.getSessionData(key);

      if (tokenData.valid === "false") return false;
      await this.setSessionData(key, "valid", false);

      const userId = key.split(":")[0];

      return this.generateToken(userId);
    } catch (error) {
      console.log({ error });
      throw new Error(`Token refreshing failed: ${error.message}`);
    }
  }

  async terminateToken(token) {
    try {
      const results = await this.getKeysByToken(token);

      if (!results) return false;

      const [key] = results;

      const tokenData = await this.getSessionData(key);

      if (tokenData.valid === "false") return "Token is already terminated";

      await this.setSessionData(key, "valid", false);

      return true;
    } catch (error) {
      console.log({ error });
      throw new Error(`Token terminating failed: ${error.message}`);
    }
  }
}

module.exports = new TokenService({
  host: TOKENS_REDIS_URI,
  port: TOKENS_REDIS_PORT,
  secret: SECRET,
  expiresIn: INVITE_EXPIRES_IN
});
