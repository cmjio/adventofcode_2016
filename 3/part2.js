/**
 * Created by chrisjohnson on 03/12/2016.
 */
var fs = require('fs');

var input = fs.readFileSync('./input.txt', 'utf8'),
    lines = input.split('\n').map(function (l) {
      return l.trim().replace(/\s+/g, ' ').split(' ').map(function (num) {
        return Number(num);
      });
    }),
    triangles = [];

function sort(arr) {
return arr.sort(function (a, b) {
    return a - b
  });
}

function transpose(lines) {
  const newLines = [];
  for (var i = 0; i < lines.length - 2; i += 3) {
    newLines.push(sort([lines[i][0], lines[i + 1][0], lines[i + 2][0]]));
    newLines.push(sort([lines[i][1], lines[i + 1][1], lines[i + 2][1]]));
    newLines.push(sort([lines[i][2], lines[i + 1][2], lines[i + 2][2]]));
  }
  return newLines;
}

transpose(lines).map(function (line) {
  if (line[0] + line[1] > line[2]) {
    triangles.push(line);
  }
});



console.log(triangles.length);