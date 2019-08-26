// const cron = require('cron');
const { io } = require('../app');
const CheckInSocket = require('./CheckInSocket');
const CommentSocket = require('./CommentSocket');

io.on('connection', (socket) => {
  socket.on('newCheckIn', (data) => CheckInSocket.newCheckIn(socket, data));
  socket.on('newComment', (data) => CommentSocket.newComment(socket, data));
});
