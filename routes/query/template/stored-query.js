'use strict';

const es = require('../../../services/esClient');

const aggs = async function() {
    const res = await es.search({
      index: 'stored-query',
      type: '.percolator',
      body: {
        size: 0,
        aggs: {
          tags: {
            terms : { field: 'tags' }
          }
        }
      }
    });
    return res.aggregations;
  };


exports.getAllTags = async () => {
    const res = await aggs();
    return res.tags.buckets
              .map(el => el.key)
              .filter(s => !s.startsWith('@'));
};

exports.all = async function(from, size, query) {
  const res = await es.search({
        index: 'stored-query',
        type: '.percolator',
        _source: 'item',
        from: from,
        size: size,
        body: { query: query }
      });
      
  const total = await es.count({
      index: 'stored-query',
      type: '.percolator',
      body: { query: query }
    });
  
  return Object.assign(res.hits, { total: total.count });
};