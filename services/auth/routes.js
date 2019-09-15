const handlers = require("./handlers");
// TODO: Add loging plugin
// TODO: Separratee public and internal routes
const routes = [
  {
    method: "POST",
    path: "/public/sign-in",
    handler: function(request, h) {
      const payload = request.payload;

      return handlers.signIn();
    }
  },
  {
    method: "POST",
    path: "/public/sign-up",
    handler: function(request, h) {
      const payload = request.payload;

      return handlers.signUp();
    }
  }
];

module.exports = routes;
