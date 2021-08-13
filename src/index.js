const express = require("express");
const { config } = require("dotenv");
const { prepareMiddlewares } = require("./controllers/middlewares");
const { loadRouters } = require("./controllers/routers");
const { connect } = require("./model");
const { setModels } = require("./controllers/middlewares/auth");

async function main() {
  config();
  const PORT = global.process.env.PORT;
  const server = express();
  const models = await connect();
  setModels(models);
  prepareMiddlewares(server);
  loadRouters(server);
  server.listen(PORT, () => {
    console.log(`Server is ready at ${PORT}`);
  });
}


main();
