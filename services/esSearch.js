'use strict';

class FullTextSearch {
  constructor(queryString, boolQuery) {
    Object.assign(this, boolQuery || { bool: { must: [] } })
    if (queryString) {
      this.bool.must.push({
          query_string: {
            default_field: '_all',
            query: queryString
          }
        });
    }
  }
}

module.exports = {
  FullTextSearch: FullTextSearch
}