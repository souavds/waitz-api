const { io } = require('../app');

io.on('connection', socket => {
  socket.on('queue', data => {
    socket.broadcast.emit('queue', data);
  });
});