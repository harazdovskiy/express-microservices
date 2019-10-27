const requestPromise = require("request-promise");

class Auth {
  constructor({ baseUrl }) {
    this.baseUrl = `${baseUrl}/internal`;
  }

  generateToken(userId) {
    return requestPromise(`${this.baseUrl}/generate`, { method: "POST", json: true, body: { userId } });
  }

  terminateToken(token) {
    return requestPromise(`${this.baseUrl}/terminate`, { method: "POST", json: true, body: { token } });
  }

  validateToken(token) {
    return requestPromise(`${this.baseUrl}/validate`, { method: "POST", json: true, body: { token } });
  }

  refreshToken(refreshToken) {
    return requestPromise(`${this.baseUrl}/refresh`, { method: "POST", json: true, body: { refreshToken } });
  }

  // expres-middleware
  async isAuthorized(req, res, next) {
    try {
      const { authorization } = req.headers;
      if (!authorization) next("Provide authorization token");
      const token = authorization.split(" ")[1];
      const res = await this.validateToken(token);
      const { data } = res;
      req.userId = data;
      return next();
    } catch (e) {
      return res.status(401).json({ err: true, message: "Unauthorized" });
    }
  }
}

module.exports = Auth;
