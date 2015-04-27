/*!
 * prettify-markdown <https://github.com/jonschlinkert/prettify-markdown>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var gfm = require('gfm-code-blocks');

module.exports = function prettify(str) {
  if (typeof str !== 'string') {
    throw new TypeError('prettify-markdown expects a string.');
  }

  var obj = removeBlocks(str);
  str = obj.str;

  str = str.split(/(?:\r\n|\n){3,}/).join('\n\n');
  str = headings(str);
  str = bolded(str);

  str = addBlocks(str, obj);
  return str.trim();
};

function headings(str) {
  var re = /^(#{1,6})\s+([^\n]+)\s+/gm;
  return str.replace(re, function (match, $1, $2) {
    return $1 + ' ' + $2 + '\n\n';
  });
}

function bolded(str) {
  var re = /^\s*\*\*([^\n]+)\*\*(?=\n)\s+/gm;
  return str.replace(re, function (match, $1) {
    return '\n**' + $1 + '**\n\n';
  });
}

function removeBlocks(str) {
  var codeBlocks = gfm(str);
  var len = codeBlocks.length;
  var stash = {}, i = 0;

  if (len > 0) {
    while (len--) {
      var key = '__BLOCK' + (i) + '__';
      var cur = codeBlocks[i++];
      stash[key] = cur;
      str = str.split(cur.block).join(key);
    }
  }
  return {str: str, stash: stash};
}

function addBlocks(str, obj) {
  var stash = obj.stash;
  for (var key in stash) {
    var val = stash[key];

    if (stash.hasOwnProperty(key)) {
      var re = new RegExp('\\s+' + key + '\\s+');

      var block = '\n\n';
      block += '```' + val.lang + '\n';
      block += val.code + '\n';
      block += '```\n\n';

      str = str.split(re).join(block);
    }
  }
  return str;
}
