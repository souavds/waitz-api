const mongoose = require('mongoose');

const initDB = () => mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });

const getDB = mongoose.connection;

module.exports = {
  initDB,
  getDB,
};
