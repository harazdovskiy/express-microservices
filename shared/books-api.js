const requestPromise = require("request-promise");

class Book {
  constructor(opts) {
    this.baseUrl = opts.baseUrl;
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
  updateBook(book) {
    return requestPromise(`${this.baseUrl}`, {
      json: true,
      method: "PUT",
      body: book
    });
  }
  deleteBook(id) {
    return requestPromise(`${this.baseUrl}/${id}`, {
      method: "DELETE"
    });
  }
}

module.exports = Book;
