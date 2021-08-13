const { authorize } = require("../middlewares/auth");
const { createHomeRouter } = require("./home");


function loadRouters(server, models) {
  server.use('/api/v1/home', createHomeRouter());
  server.use('/api/v1/authenticate', authorize);
}

module.exports = {
  loadRouters
}
