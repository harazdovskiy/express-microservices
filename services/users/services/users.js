const bcrypt = require("bcrypt");
const User = require("../db/user");

class UserService {
  static genPasswordHash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  }

  static comparePasswords(password, hashedPassword) {
    return bcrypt.compareSync(password, hashedPassword);
  }

  async createUser(user) {
    const { password, ...data } = user;
    const createdUserDoc = await User.create({
      password: UserService.genPasswordHash(password),
      ...data
    });
    const createdUser = createdUserDoc.toJSON();
    delete createdUser.password;
    return createdUser;
  }
  async getUser(id) {
    const user = await User.findOne({
      where: { id },
      attributes: {
        exclude: ["password"]
      }
    });
    return user;
  }

  async getUsers() {
    return User.findAll({
      attributes: {
        exclude: ["password"]
      }
    });
  }

  async authenticateUser({ email, password }) {
    const user = await User.findOne({ where: { email } });
    const authed = UserService.comparePasswords(
      password,
      user.toJSON().password
    );
    if (!authed) throw Error("Unauthorized");
    delete user.password;
    return user;
  }

  async updateUser(user) {
    const { id, ...valuesToUpdate } = user;
    const updatedUser = User.update(
      {
        ...valuesToUpdate
      },
      {
        where: {
          id
        }
      }
    );
    return this.getUser(id);
  }

  async deleteUser(id) {
    return User.destroy({ where: { id } });
  }
}

module.exports = new UserService();
