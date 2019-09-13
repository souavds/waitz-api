const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const morgan = require('morgan');
const passport = require('passport');

const app = express();

const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(cors(), helmet(), compression(), express.json(), morgan('dev'), passport.initialize());

require('./config/passport')(passport);
require('./routes')(app);

module.exports = { app, http, io };
