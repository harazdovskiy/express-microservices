const requestPromise = require("request-promise");

class User {
  constructor(opts) {
    this.baseUrl = opts.baseUrl;
  }

  getUserById(id) {
    return requestPromise(`${this.baseUrl}/${id}`, { json: true });
  }

  createdUser(book) {
    return requestPromise(`${this.baseUrl}`, {
      json: true,
      method: "POST",
      body: book
    });
  }
  updateUser(book) {
    return requestPromise(`${this.baseUrl}`, {
      json: true,
      method: "PUT",
      body: book
    });
  }
  deleteUser(id) {
    return requestPromise(`${this.baseUrl}/${id}`, {
      method: "DELETE"
    });
  }
}

module.exports = User
