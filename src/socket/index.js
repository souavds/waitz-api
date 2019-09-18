// const cron = require('cron');
const { io } = require('../app');
const CheckSocket = require('./Check');
const CommentSocket = require('./Comment');

io.on('connection', (socket) => {
  socket.on('newCheckIn', (data) => CheckSocket.newCheckIn(io, socket, data));
  socket.on('newCheckOut', (data) => CheckSocket.newCheckOut(io, socket, data));
  socket.on('newComment', (data) => CommentSocket.newComment(io, socket, data));
});
