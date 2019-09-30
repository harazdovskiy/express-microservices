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

  async authenticateUser({ email, password }) {
    const user = await User.findOne({ email })
      .select("+password")
      .lean();
    const authed = UserService.comparePasswords(password, user.password);
    if (!authed) throw Error("Unauthorized");
    delete user.password;
    return user;
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

  static genPasswordHash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  }

  static comparePasswords(password, hashedPassword) {
    return bcrypt.compareSync(password, hashedPassword);
  }
}

module.exports = new UserService();
