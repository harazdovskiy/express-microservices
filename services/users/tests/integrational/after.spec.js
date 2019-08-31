const { dbConnection } = require("../../db/connections");
const { expect } = require("chai");

describe("", () => {
  before(async () => {
    await dbConnection.close();
  });

  it("should shut the server down", () => {
    expect(dbConnection.readyState).equal(0);
  });
});
