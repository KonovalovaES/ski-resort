const express = require('express');

const uses = require('./config/uses');
const routes = require('./config/routes');

const dbConnectionChecker = require('./helpers/dbConnectionChecker');

const app = express();

const PORT = process.env.PORT ?? 4000;

uses(app);
routes(app);

app.listen(PORT, () => {
  console.log('The server is connected');
  dbConnectionChecker();
});
