const request = require("supertest");
const app = require("../../index");

describe("test main api-geteways routes", () => {
  test("it should response with 200  on healthcheck route", done => {
    request(app)
      .get("/healthcheck")
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  test("it should response with 404 on any other route", done => {
    request(app)
      .get("/qwerty")
      .then(response => {
        expect(response.statusCode).toBe(404);
        done();
      });
  });
});
