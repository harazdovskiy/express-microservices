const handlers = require("./handlers");
const routes = [
  {
    method: "POST",
    path: "/internal/generate-token",
    handler: async function(request, h) {
<<<<<<< HEAD
      console.log("payload: ", request.payload);

=======
>>>>>>> 43d02da0cf28b5d7d5746f358408c2c7b22184f5
      const user = await handlers.generateToken(request.payload);
      return h.response({ err: false, user });
    }
  }
];

module.exports = routes;
