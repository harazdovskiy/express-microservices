const seneca = require("seneca");

module.exports = class Server {
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
    }).use("redis-transport");
  }

  /**
   * @param  {{name: string, handler: (params: object, reply){} }[]} array
   */
  handlers(array = []) {
    if (array.length) {
      array.forEach(executor => {
        const pattern = `${this.name}:${executor.name}`;
        this.service.add(pattern, executor.handler);
      });
    }

    return this;
  }

  run() {
    this.service
      .ready(() => {
        console.log(`Service ready with ${this.pin}`);
      })
      .listen({
        pin: this.pin,
        type: "redis",
        host: "message-broker",
        port: 6667,
        topic: "messages"
      });
  }
};
