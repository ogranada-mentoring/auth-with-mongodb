const { Router } = require("express");
const { verifyJWT, authorize } = require("../middlewares/auth");

function createHomeRouter() {
  const router = Router();
  router.get('/', (req, res) => {
    res
      .status(200)
      .json({
        message: 'all is fine'
      })
  })

  router.get('/private', verifyJWT, (req, res) => {
    res
      .status(200)
      .json({
        message: 'Si lees esto es por que eres VIP'
      });
  })


  router.post('/login', authorize, (req, res) => {
  })

  return router;
}

module.exports = {
  createHomeRouter
}
