const { User } = require("microservices-api");
const UsersApi = new User({ baseUrl: `${process.env.USERS_URL}${USERS_PORT}/internal` });

module.exports.signUp = async user => {
  const res = await UsersApi.createdUser(user);
  return res;
};

module.exports.signIn = async (email, password) => {};
