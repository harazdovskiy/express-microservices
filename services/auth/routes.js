const handlers = require("./handlers");
const routes = [
  {
    method: "POST",
    path: "/public/sign-in",
    handler: async function(request, h) {
      const user = await handlers.signIn(request.payload);
      return h.response({ err: false, user });
    }
  }
];

module.exports = routes;
