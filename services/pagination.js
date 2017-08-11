'use strict';

module.exports = (from = 0, size = 0, total = 0) => {

  const next = +from + +size;
  const prev = +from - +size;

  let arr = [];
  const map = new Map();

  if (next < total)
    arr.push({ params: { from: next, size: +size }, rel: 'next', prompt: 'Next' });

  if(prev > 0)
    arr.push({ params: { from: prev, size: +size }, rel: 'previous', prompt: 'Previous' });
  
  if( prev <= 0 && from > 0)
    arr.push({ params: { size: +size }, rel: 'previous', prompt: 'Previous' });

  if (next < total)
    map.set('next', { from: next, size: +size });

  if(prev > 0)
    map.set('previous', { from: prev, size: +size });
  
  if( prev <= 0 && from > 0)
    map.set('previous', { size: +size });
  
  return map;
};