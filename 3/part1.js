/**
 * Created by chrisjohnson on 03/12/2016.
 */
var fs = require('fs');

var input = fs.readFileSync('./input.txt', 'utf8'),
    lines = input.split('\n').map(function (l) {
      l = l.trim().replace(/\s+/g, ' ').split(' ').map(function (num) {
         return Number(num);
      });

      console.log(l)
    }),
    triangles = [];

lines.map(function (line) {
  if (line[0] + line[1] > line[2]) {
    triangles.push(line)
  }
});

console.log(triangles.length);