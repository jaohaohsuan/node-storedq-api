'use strict';

const routes = require('express').Router();

routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Conneted' });
});

const query = require('./query');

routes.use('/_query', query);

module.exports = routes;