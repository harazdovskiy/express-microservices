const requestPromise = require("request-promise");

class Book {
  constructor(opts) {
    this.baseUrl = opts.baseUrl;
    this.baseUrlAlt = opts.baseUrlAlt;
  }

  getBookById(id) {
    return requestPromise(`${this.baseUrl}/${id}`, { json: true });
  }

  createdBook(book) {
    return requestPromise(`${this.baseUrl}`, {
      json: true,
      method: "POST",
      body: book
    });
  }
}

module.exports = new Book({
  baseUrl: `http://books:${process.env.BOOKS_PORT}`
});
