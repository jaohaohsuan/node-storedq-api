`use strict`;

const routes = require('express').Router();

routes.use('/', (req, res, next) => {
  next();
});

module.exports = {

}