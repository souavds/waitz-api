const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors(), helmet(), bodyParser.json());

const http = require('http').createServer(app)
const io = require('socket.io')(http);

module.exports = { app, http, io };