const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');

const app = express();

const http = require('http').createServer(app);
const io = require('socket.io')(http);

const routes = require('./routes');

app.use(cors(), helmet(), compression(), express.json());

app.use('/place', routes.PlaceRoutes);

module.exports = { app, http, io };
