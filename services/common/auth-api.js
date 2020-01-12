const Client = require("./seneca/client");

class Auth {
  constructor() {
    this.AuthService = new Client("auth");
  }

  generateToken(userId) {
    return this.AuthService.act("token:generate", { userId });
  }

  terminateToken(token) {
    return this.AuthService.act("token:terminate", { token });
  }

  validateToken(token) {
    return this.AuthService.act("token:validate", { token });
  }

  refreshToken(refreshToken) {
    return this.AuthService.act("token:refresh", { refreshToken });
  }

  // expres-middleware
  async isAuthorized(req, res, next) {
    try {
      const { authorization } = req.headers;
      if (!authorization) {
        return res
          .status(401)
          .json({ err: true, message: "Provide authorization token" });
      }
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
