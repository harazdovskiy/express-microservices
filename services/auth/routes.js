const handlers = require("./handlers");
const routes = [
  {
    method: "POST",
    path: "/internal/generate",
    handler: async function(request, h) {
      try {
        const data = await handlers.generateToken(request.payload.userId);
        return h.response({ err: false, data });
      } catch (error) {
        h.response({ err: true, mesage: error.message }).code(400);
      }
    }
  },
  {
    method: "POST",
    path: "/internal/validate",
    handler: async function(request, h) {
      try {
        const data = await handlers.validateToken(request.payload.token);
        return h.response({ err: false, data });
      } catch (error) {
        h.response({ err: true, mesage: error.message }).code(400);
      }
    }
  },
  {
    method: "POST",
    path: "/internal/terminate",
    handler: async function(request, h) {
      try {
        const data = await handlers.terminateToken(request.payload.token);
        return h.response({ err: false, data });
      } catch (error) {
        h.response({ err: true, mesage: error.message }).code(400);
      }
    }
  },
  {
    method: "POST",
    path: "/internal/refresh",
    handler: async function(request, h) {
      try {
        const data = await handlers.refreshToken(request.payload.refreshToken);
        return h.response({ err: false, data });
      } catch (error) {
        h.response({ err: true, mesage: error.message }).code(400);
      }
    }
  }
];

module.exports = routes;
