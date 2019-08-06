require('dotenv').config();
require('./socket/index');

const { http } = require('./app');

const port = process.env.PORT;

http.listen(port, () => console.log(`Listening on port ${port}`));