const TokenService = require("./service");

module.exports.generateToken = async userId => {
  return TokenService.generateToken(userId);
};

module.exports.validateToken = async token => {
  return TokenService.validateToken(token);
};

module.exports.refreshToken = async refreshToken => {
  return TokenService.refreshToken(refreshToken);
};

module.exports.terminateToken = async token => {
  return TokenService.terminateToken(token);
};
