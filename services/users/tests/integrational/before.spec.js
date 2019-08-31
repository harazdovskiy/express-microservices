const { MongoMemoryServer } = require("mongodb-memory-server");
const { dbConnection, dbOptions } = require("../../db/connections");
const { expect } = require("chai");

async function openMongoTestConnection() {
  const mongoserver = new MongoMemoryServer();
  const mongoURI = await mongoserver.getConnectionString();
  dbConnection.openUri(mongoURI, dbOptions);
  await new Promise((resolve, reject) => {
    dbConnection.once("open", resolve);
    dbConnection.once("error", reject);
  });
}

try {
  describe("before all tests", () => {
    before(async () => {
      await openMongoTestConnection();
    });

    it("tests connection is established", async () => {
      const ready = dbConnection.readyState;
      expect(ready).to.be.equal(1);
    });
  });
} catch (error) {
  console.error(error);
}
