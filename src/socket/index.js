// const cron = require('cron');
const { io } = require('../app');

const { CheckIn } = require('../models/checkIn');

io.on('connection', socket => {
  socket.on('queue', data => {
    socket.broadcast.emit('queue', data);
    // const checkIn = new CheckIn({
    //   user: data.user,
    //   place: {
    //     ...data.place
    //   }
    // });
    // checkIn.save(() => {
    //   socket.broadcast.emit('queue', data);
    //   // const job = new cron.CronJob('10 * * * * *', () => {
    //   //   const d = new Date();
    //   //   console.log('At One Minute:', d);
    //   //   data.queue = data.queue - 1;
    //   //   io.emit('queue', data);
    //   //   job.stop();
    //   // }, null, true);
    // })
  });
});