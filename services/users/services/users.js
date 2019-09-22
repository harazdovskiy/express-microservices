const User = require("../db/user");
const { ObjectId } = require("mongoose").Types;
const bcrypt = require("bcrypt");

class UserService {
  async createUser(user) {
    const { password, ...data } = user;
    return User.create({
      password: UserService.genPasswordHash(password),
      ...data
    });
  }
  async getUser(id) {
    return User.findById(id);
  }

  async getUsers() {
    return User.find();
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

  static genPasswordHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

module.exports = new UserService();
