// const cron = require('cron');
const { io } = require('../app');
const CheckInSocket = require('./CheckInSocket');

io.on('connection', socket => {
  socket.on('newCheckIn', data => CheckInSocket.newCheckIn(socket, data));
});