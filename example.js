var fs = require('fs');
var format = require('./');

var str = fs.readFileSync('fixtures/example.md', 'utf8');
console.log(format(str));
