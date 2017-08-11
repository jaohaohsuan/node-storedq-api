'use strict';

const elasticsearch = require('elasticsearch');
const client = new elasticsearch.Client({
  host: '192.168.1.100:31290',
  log: 'info'
});

module.exports = client