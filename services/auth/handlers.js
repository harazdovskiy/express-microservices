const { User } = require('../common');
const UsersApi = new User({ baseUrl: `${process.env.USERS_URL}:${process.env.USERS_PORT}/internal` });

module.exports.signUp = async user => {
  const res = await UsersApi.createdUser(user);
  return res;
};

module.exports.signIn = async (email, password) => {};
