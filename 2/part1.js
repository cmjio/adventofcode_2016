var fs = require('fs');

var input = fs.readFileSync('./input.txt', 'utf8'),
    keypad = [
                [1,2,3],
                [4,5,6],
                [7,8,9]
              ],
    result = [],
    indexes = [],
    row = 1,
    col = 1,
    last = 'X',
    iteration = 0,
    lines = input.split('\n').map(function(l) {
      return l.split('');
    });

function push(s, i, lineIdx) {
  if (last !== s && iteration > 0) {
    iteration = 0;
  }

  if (last === s && iteration === 0) {
    iteration++;
  }

  if ((lines[lineIdx].length -1 === i)) {
    result.push(keypad[row][col]);
    indexes.push(i);
    iteration = 0;
  }
}

lines.forEach(function(line, lineIdx) {
  line.forEach(function(s, i) {
    var length = line.length -1;
    if (s === 'L') {
      if (col > 0) {
        col--;
      }
      if ((length === i) || ((length !== i) && col === 0)) {
        push(s, i, lineIdx)
      }
    } else if (s === 'R') {
      if (col < 2) {
        col++;
      }
      if ((length === i) || ((length === i) && col === 2)) {
        push(s, i, lineIdx)
      }
    } else if (s === 'U') {
      if (row > 0) {
        row--;
      }
      if ((length === i) || ((length === i) && row === 0)) {
        push(s, i, lineIdx)
      }
    } else if (s === 'D') {
      if (row < 2) {
        row++;
      }
      if ((length === i) || ((length === i) && row === 2)) {
        push(s, i, lineIdx)
      }
    }

    last = s;
  });
});

console.log(result.join(''));
