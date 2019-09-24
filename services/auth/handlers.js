const { User } = require("../common");
const UsersApi = new User({ baseUrl: `${process.env.USERS_URL}:${process.env.USERS_PORT}/internal` });

module.exports.signIn = async ({ password, email }) => {
  const res = await UsersApi.getUserByField({ email });
  return res;
};
