/*!
 * prettify-markdown <https://github.com/jonschlinkert/prettify-markdown>
 *
 * Copyright (c) 2015 Jon Schlinkert.
 * Licensed under the MIT license.
 */

'use strict';

/* deps:mocha */
var assert = require('assert');
var should = require('should');
var prettify = require('./');

describe('prettify', function () {
  it('should strip leading newlines:', function () {
    prettify('\n\n\nb').should.equal('b');
  });

  it('should strip trailing newlines:', function () {
    prettify('b\n\n\n').should.equal('b');
  });

  it('should reduce multiple newlines down to two:', function () {
    prettify('foo\n\n\nbar').should.equal('foo\n\nbar');
    prettify('a\n\n\nb').should.equal('a\n\nb');
    prettify('a\n\n\n\n\n\n\nb').should.equal('a\n\nb');
  });

  it('should format headings to have two newlines before content:', function () {
    prettify('# foo\nbar').should.equal('# foo\n\nbar');
    prettify('## foo\n\n\nbar').should.equal('## foo\n\nbar');
  });

  it('should give "section headings" headings two newlines before content:', function () {
    prettify('**foo**\nbar').should.equal('**foo**\n\nbar');
    prettify('**foo**\n\n\nbar').should.equal('**foo**\n\nbar');
  });

  it('should not reformat bolded text that is not a heading:', function () {
    prettify('a b c **foo**\nbar').should.equal('a b c **foo**\nbar');
    prettify('one **two** three\nbar').should.equal('one **two** three\nbar');
  });

  it('should ensure an extra newline before and after gfm code blocks:', function () {
    var str = 'a\n```js\nvar foo = "bar";\n```\nb';
    prettify(str).should.equal('a\n\n```js\nvar foo = "bar";\n```\n\nb');
  });

  it('should throw an error when bad args are passed:', function () {
    (function () {
      prettify();
    }).should.throw('prettify-markdown expects a string.');
    (function () {
      prettify({});
    }).should.throw('prettify-markdown expects a string.');
    (function () {
      prettify(null);
    }).should.throw('prettify-markdown expects a string.');
  });
});
