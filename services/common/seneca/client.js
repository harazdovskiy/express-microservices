const seneca = require("seneca");

module.exports = class Client {
  constructor(name) {
    if (!name) {
      throw new Error("Pin should be valid");
    }

    this.name = name;
    this.pin = `${name}:*`;

    this.service = seneca({
      log: {
        short: true
      }
    })
      .use("redis-transport")
      .ready(() => {
        console.log(`Client ready with ${this.pin}`);
      })
      .client({
        pin: this.pin,
        type: "redis",
        host: "message-broker",
        port: 6667,
        topic: "messages"
      });
  }

  act(actorName, ...args) {
    const pattern = `${this.name}:${actorName}`;
    return new Promise((resolve, reject) => {
      this.service.act(pattern, ...args, (err, res) => {
        if (err) return reject(Error(err));
        return resolve(res);
      });
    });
  }
};
