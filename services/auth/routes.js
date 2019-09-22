const handlers = require("./handlers");
// TODO: Add loging plugin
// TODO: Separratee public and internal routes
const routes = [
  {
    method: "POST",
    path: "/public/sign-in",
    handler: function(request, h) {
      return handlers.signIn(request.payload);
    }
  },
  {
    method: "POST",
    path: "/public/sign-up",
    handler: function(request, h) {
      return handlers.signUp(request.payload);
    }
  }
];

module.exports = routes;
