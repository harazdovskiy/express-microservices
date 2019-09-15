const Hapi = require("@hapi/hapi");
const routes = require("./routes");

const server = Hapi.server({
  port: process.env.AUTH_PORT,
  host: "0.0.0.0"
});

server.route([
  ...routes,
  {
    method: "*",
    path: "/{any*}",
    handler: function(request, h) {
      return "404 Error! Page Not Found!";
    }
  }
]);

const init = async () => {
  await server.start();
  console.log("Server running on %s", server.info.uri);
};

init();
