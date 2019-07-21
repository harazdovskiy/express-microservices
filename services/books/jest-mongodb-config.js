module.exports = {
  mongodbMemoryServerOptions: {
    instance: {
      dbName: "book"
    },
    binary: {
      version: "3.6.10",
      skipMD5: true
    },
    autoStart: false,
    testEnvironment: "node"
  }
};
