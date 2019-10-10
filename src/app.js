const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const morgan = require('morgan');

const app = express();

const http = require('http').createServer(app);
const io = require('socket.io')(http);

const corsOptions = {
  origin:
    process.env.NODE_ENV === 'production'
      ? 'https://waitz.arthurvdiniz.now.sh'
      : 'http://localhost:3000',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions), helmet(), compression(), express.json(), morgan('dev'));

require('./routes')(app);

module.exports = { app, http, io };
