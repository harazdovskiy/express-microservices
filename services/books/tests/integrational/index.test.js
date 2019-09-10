process.env.BOOKS_MONGODB_URI = global.__MONGO_URI__;

const mongoose = require("mongoose");
const supertest = require("supertest");

const app = require("../../index");
const connetion = require("../../db");
const { ObjectId } = mongoose.Types;
const Book = require("../../db/book");

describe("insert", () => {
  beforeEach(async () => {
    await connetion.dropDatabase();
  });

  afterAll(async () => {
    await app.close();
    await mongoose.disconnect();
  });

  it("should return book on GET request", async () => {
    const book = await Book.create({
      _id: ObjectId(),
      title: "BestBookEver",
      summary: "String",
      isbn: "also STrING",
      author: "Shkaf",
      ratings: 4
    });
    const response = await supertest(app).get(`/public/${book._id}`);
    expect(response.statusCode).toEqual(200);
    expect(JSON.stringify(response.body.data)).toEqual(JSON.stringify(book));
  });

  it("should create book on POST request", async () => {
    const bookToCreate = {
      _id: ObjectId(),
      title: "BestBookEver",
      summary: "String",
      isbn: "also STrING",
      author: "Shkaf",
      ratings: 4
    };

    const response = await supertest(app)
      .post(`/public`)
      .send(bookToCreate);
    expect(response.statusCode).toEqual(200);

    const storedBook = await Book.findById(bookToCreate._id).lean();
    delete storedBook.__v;
    delete storedBook.createdAt;
    delete storedBook.updatedAt;

    expect(storedBook).toEqual(bookToCreate);
  });

  it("should update book on PUT request", async () => {
    const dbBook = {
      _id: ObjectId(),
      title: "BestBookEver",
      summary: "String",
      isbn: "also STrING",
      author: "Shkaf",
      ratings: 4
    };
    await Book.create(dbBook);

    const editedBook = {
      _id: dbBook._id,
      title: "Edited",
      summary: "Array",
      isbn: "also STrING",
      author: "Dimon",
      ratings: 10
    };

    const response = await supertest(app)
      .put(`/public`)
      .send(editedBook);

    expect(response.statusCode).toEqual(200);

    const storedBook = await Book.findById(editedBook._id).lean();

    // expect to receive updated book
    expect(JSON.stringify(response.body.data)).toEqual(
      JSON.stringify(storedBook)
    );
  });

  it("should delete book on DELETE request", async () => {
    const dbBook = {
      _id: ObjectId(),
      title: "BestBookEver",
      summary: "String",
      isbn: "also STrING",
      author: "Shkaf",
      ratings: 4
    };
    await Book.create(dbBook);

    const response = await supertest(app).delete(`/public/${dbBook._id}`);

    expect(response.statusCode).toEqual(200);

    const storedBook = await Book.findById(dbBook._id);

    expect(storedBook).toBe(null);
  });
});
