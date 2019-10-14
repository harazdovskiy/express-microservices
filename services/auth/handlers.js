const { User } = require("../common");
const TokenService = require("./service");

module.exports.generateToken = async (userId) => {
  return TokenService.generateToken(userId);
};
