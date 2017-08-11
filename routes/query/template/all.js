'use strict';

// services
const pages = require('../../../services/pagination');
const { FullTextSearch } = require('../../../services/esSearch');
const storedQuery = require('./stored-query');

// lib
const { URL, URLSearchParams } = require('url');
const _ = require('lodash');
const router = require('express').Router();

router.use((req, res, next) => {
  if (!req.query.from) req.query.from = 0
  if (!req.query.size) req.query.size = 10
  next();
});

const setHref = (link, params, req) => {
  const href = new URL(req.href);
  href.search = new URLSearchParams(Object.assign(_.assign(params, _.omit(_.assign({}, req.query), ['from', 'size']))));
  link.href = href
  return link;
};

router.get('/', async (req, res) => {

  const from = req.query.from;
  const size = req.query.size;
  
  const all = await storedQuery.all(from, size, new FullTextSearch(req.query.q));
  const nav = pages(from, size, all.total);

  const body = {
    collection: {
      version: '1.0',
      href: req.href,
      links: _.filter([
        {
          rel: 'next',
          render: 'link',
          prompt: 'Next'
        },
        {
          rel: 'previous',
          render: 'link',
          prompt: 'Previous'
        }
      ], el => nav.has(el.rel)).map( el => setHref(el, nav.get(el.rel), req)),
      items: all.hits.map(el => {
        el._source.item.href = `${req.href}/${el._id}`;
        return el._source.item;
      }),
      queries: [
        {
          href: req.href,
          rel: 'search',
          data: [
            {
              name: 'from',
              prompt: 'items display from'
            },
            {
              name: 'size',
              prompt: 'size of displayed items'
            },
            {
              name: 'q',
              prompt: 'search title or any terms'
            },
            {
              name: 'tags',
              prompt: await storedQuery.getAllTags()
            }
          ]
        }
      ],
      template: {}
    }
  };

  res.set('Content-Type', 'application/vnd.collection+json; charset=UTF-8')
     .status(200)
     .json(body);
});

module.exports = router;
