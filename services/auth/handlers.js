const { User } = require("../common");
const UsersApi = new User({ baseUrl: `${process.env.USERS_URL}:${process.env.USERS_PORT}` });

module.exports.signIn = async ({ password, email }) => {
  const res = await UsersApi.authenticateUser({ email, password });
  return res.data;
};
