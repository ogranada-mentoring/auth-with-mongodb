const mongoose = require('mongoose');

const { createUsersModel } = require('./models/users.js');

function connect() {
  /*
  const {
    DB_HOST: host,
    DB_PORT: port,
    DB_NAME: database
  } = global.process.env;
  */
 const host = global.process.env.DB_HOST;
 const port = global.process.env.DB_PORT;
 const database = global.process.env.DB_NAME;
  return new Promise((resolve, reject) => {
    mongoose.connect(`mongodb://${host}:${port}/${database}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    const db = mongoose.connection;

    db.on('error', reject);

    db.once('open', function () {
      console.log('Db is ready...')
      const Users = createUsersModel();
      resolve({
        Users
      });
    });
  });
}

module.exports = {
  connect
}
