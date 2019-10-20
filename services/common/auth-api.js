const requestPromise = require("request-promise");

class Auth {
  constructor({ baseUrl }) {
    this.baseUrl = `${baseUrl}/internal`;
  }

  generateToken(userId) {
    return requestPromise(`${this.baseUrl}/generate-token`, { method: "POST", json: true, body: { userId } });
  }
}

module.exports = Auth;
