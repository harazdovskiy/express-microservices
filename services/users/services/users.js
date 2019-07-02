const User = require("../db/user");
const { ObjectId } = require("mongoose").Types;

class UserService {
  async createUser(user) {
    return User.create(user);
  }
  async getUser(id) {
    return User.findById(id);
  }

  async updateUser(user) {
    const { _id, ...valuesToUpdate } = user;
    return User.findByIdAndUpdate(
      ObjectId(_id),
      {
        $set: valuesToUpdate
      },
      { new: true }
    );
  }

  async deleteUser(id) {
    return User.findByIdAndDelete(ObjectId(id));
  }
}

module.exports = new UserService();
