/* eslint-disable promise/always-return */
/* eslint-disable promise/catch-or-return */
require('dotenv').config();
require('./socket');

const { http } = require('./app');
const { initDB } = require('./config/database');

const port = process.env.PORT || 5000;

initDB().then(async () => {
  // eslint-disable-next-line no-console
  http.listen(port, () => console.log(`Listening on port ${port}`));
});
