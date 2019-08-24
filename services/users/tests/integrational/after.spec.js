const { dbConnection } = require("../../db/connections");

describe("after All test", () => {
  after(async () => {
    const res = await dbConnection.close();
  });
});
