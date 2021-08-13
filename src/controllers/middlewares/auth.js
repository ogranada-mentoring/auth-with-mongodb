const jwt = require('jsonwebtoken');

let models = {};


/**
 * Middleware para verificar un token
 * @param {*} req petición
 * @param {*} res respuesta a petición
 * @param {*} next siguiente handler/middleware
 */
function verifyJWT(req, res, next) {
  const bearer = req.headers.authorization
  const token = (bearer !== undefined ? bearer : '')
    .replace('Bearer ', '');
  const JWT_PASS = global.process.env.JWT_PASS;
  jwt.verify(token, JWT_PASS, function(error, decoded) {
    if (error) {
      res
        .status(401)
        .json({
          message: 'invalid credentials'
        })
    } else {
      next()
    }
  });
}

async function authorize(req, res, next) {
  try {
    const JWT_PASS = global.process.env.JWT_PASS;
    const username = req.body.username;
    const password = req.body.password;
    const q = {
      username: username,
      password: password,
    };
    console.log(q);
    const user = await models.Users.findOne(q).exec();
    if (user !== null) {
      const token = jwt.sign(user.toJSON(), JWT_PASS);
      res
        .status(200)
        .json({
          token: token
        });
      next();
    } else {
      res
        .status(401)
        .json({
        message: 'invalid credentials'
      });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({
      message: 'invalid credentials'
    });
  }
}

function setModels(_models) {
  models = _models;
}

module.exports = {
  verifyJWT,
  setModels,
  authorize
};
