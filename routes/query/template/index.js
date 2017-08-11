'use strict';

const template = require('express').Router();
const all = require('./all');
const item = require('./item');

template.use('/', all);
template.get('/:id', item);

module.exports = template;