const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const initDB = () => mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });

const getDB = mongoose.connection;

module.exports = {
  initDB,
  getDB,
};
