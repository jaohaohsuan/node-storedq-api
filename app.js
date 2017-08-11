'use strict';

const colors = require('colors');
const url    = require('url');
const util   = require('util');
const app    = require('express')();
const routes = require('./routes');

// middleware
app.use((req, res, next) => {
  req.href = req.protocol + '://' + req.get('host') + req.baseUrl + req.path.replace(/\/$/, "");
  next();
});

app.use('/sapi', routes);

app.listen(3000, () => {
  console.log('Example app listening on port 3000!'.green);
});