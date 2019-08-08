require('dotenv').config();
require('./socket/index');

const { http } = require('./app');
const { initDB } = require('./config/database');

const port = process.env.PORT || 5000;

initDB().then(() => {
  http.listen(port, () => console.log(`Listening on port ${port}`));
})
