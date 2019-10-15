const requestPromise = require("request-promise");

class Auth {
  constructor({ baseUrl }) {
    this.baseUrl = `${baseUrl}/internal`;
  }

  async generateToken(userId) {
    const data = await requestPromise(`${this.baseUrl}/generate-token`, { method: "POST", json: true, body: userId });
    return JSON.parse(data);
  }
}

module.exports = Auth;
