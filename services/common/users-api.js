const requestPromise = require("request-promise");

class User {
  constructor({ baseUrl }) {
    this.baseUrl = `${baseUrl}/internal`;
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
  getUserByField(queryParams) {
    return requestPromise(`${this.baseUrl}/?`, {
      method: "GET",
      qs: queryParams
    });
  }
}

module.exports = User;
