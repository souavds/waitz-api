const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const app = express();

app.use(cors(), helmet(), express.json());

const http = require('http').createServer(app)
const io = require('socket.io')(http);

const routers = require('./routers');

app.use('/checkin', routers)

module.exports = { app, http, io };