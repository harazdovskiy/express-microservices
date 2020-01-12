const Server = require("../common/seneca/server");
const handlers = require("./handlers");

const server = new Server("auth");

server
  .handlers([
    {
      name: "token:generate",
      handler: async (params, reply) => {
        try {
          const { userId } = params;
          if (!userId) {
            throw new Error("Handler require userId param!");
          }
          const data = await handlers.generateToken(userId);
          return reply(null, data);
        } catch (error) {
          return reply(error);
        }
      }
    },
    {
      name: "token:refresh",
      handler: async (params, reply) => {
        try {
          const { refreshToken } = params;
          if (!refreshToken) {
            throw new Error("Handler require refreshToken param!");
          }
          const data = await handlers.refreshToken(refreshToken);
          return reply(null, data);
        } catch (error) {
          return reply(error);
        }
      }
    },
    {
      name: "token:terminate",
      handler: async (params, reply) => {
        try {
          const { token } = params;
          if (!token) {
            throw new Error("Handler require token param!");
          }
          const data = await handlers.terminateToken(token);
          return reply(null, { data });
        } catch (error) {
          return reply(error);
        }
      }
    },
    {
      name: "token:validate",
      handler: async (params, reply) => {
        try {
          const { token } = params;
          if (!token) {
            throw new Error("Handler require token param!");
          }
          const data = await handlers.validateToken(token);
          return reply(null, data);
        } catch (error) {
          return reply(error);
        }
      }
    }
  ])
  .run();
