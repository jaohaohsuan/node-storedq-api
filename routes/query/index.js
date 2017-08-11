'use strict';

const query = require('express').Router();
const template = require('./template');

query.use('/template', template);

module.exports = query;