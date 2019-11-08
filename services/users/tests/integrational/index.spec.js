const { dbConnection } = require("../../db/connections");
const User = require("../../db/user");
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../index");

chai.use(chaiHttp);
const { expect } = chai;
let app = chai.request(server).keepOpen();

describe("user api tests", () => {
  afterEach(async () => {
    await dbConnection.dropDatabase();
  });

  it("get app 404", async () => {
    const res = await app.get("/some/shit");
    expect(res.status).to.be.equal(404);
  });

  it("should create user, response with 200 and created user object", async () => {
    const user = {
      firstName: "Dmytro",
      lastName: "Harazdovskiy",
      email: "tets@email.com",
      password: "password",
      city: "Lviv",
      address: "My street",
      title: "Artist",
      country: "Ukraine",
      state_province: "Best privince"
    };

    const res = await app.post("/internal").send(user);
    expect(res.status).to.be.equal(200);

    expect(res.body.err).to.be.false;

    const createdUser = res.body.data;

    delete createdUser._id;
    delete createdUser.__v;
    delete user.password;

    expect(createdUser).to.be.deep.equal(user);
  });

  it("should get user, response with 200 and user object", async () => {
    const user = await User.create({
      firstName: "Dmytro",
      lastName: "Harazdovskiy",
      email: "tets@email.com",
      password: "password",
      city: "Lviv",
      address: "My street",
      title: "Artist",
      country: "Ukraine",
      state_province: "Best privince"
    }).then(data => JSON.parse(JSON.stringify(data)));

    const res = await app.get(`/internal/${user._id}`);

    delete user.password;
    expect(res.status).to.be.equal(200);

    expect(res.body).to.be.deep.equal({
      err: false,
      data: user
    });
  });

  it("should delete user response with 200 and data true", async () => {
    const user = await User.create({
      firstName: "Dmytro",
      lastName: "Harazdovskiy",
      email: "tets@email.com",
      password: "password",
      city: "Lviv",
      address: "My street",
      title: "Artist",
      country: "Ukraine",
      state_province: "Best privince"
    }).then(data => JSON.parse(JSON.stringify(data)));

    const res = await app.delete(`/internal/${user._id}`);

    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.deep.equal({
      err: false,
      removed: true
    });
  });

  it("should edit user and response with 200", async () => {
    const user = await User.create({
      firstName: "Dmytro",
      lastName: "Harazdovskiy",
      email: "tets@email.com",
      city: "Lviv",
      address: "My street",
      title: "Artist",
      country: "Ukraine",
      password: "password",
      state_province: "Best privince"
    }).then(data => JSON.parse(JSON.stringify(data)));

    const editedUser = {
      _id: user._id,
      firstName: "Anna",
      lastName: "Linska",
      email: "super@email.com",
      city: "Oklahoma",
      address: "Bewerly street",
      title: "Barmaid",
      country: "USA",
      state_province: "Oklahoma"
    };

    delete user.password;
    const res = await app.put("/internal").send(editedUser);

    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.deep.equal({
      err: false,
      data: { ...user, ...editedUser }
    });
  });
});
