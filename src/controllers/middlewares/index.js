const express = require('express');
const { verifyJWT, setModels } = require('./auth');

function prepareMiddlewares(server, models) {
  server.use(express.json());
  server.use(express.urlencoded({extended: false}));

  // server.use(verifyJWT);
}

module.exports = {
  prepareMiddlewares
};
