const handlers = require("./handlers");
const routes = [
  {
    method: "POST",
    path: "/internal/generate-token",
    handler: async function(request, h) {
      const token = await handlers.generateToken(request.payload.userId);
      return h.response({ err: false, token });
    }
  }
];

module.exports = routes;
