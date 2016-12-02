var fs = require('fs');

var input = fs.readFileSync('./input.txt', 'utf8'),
    keypad = [
      [null, null, 1, null, null],
      [null, 2, 3, 4, null],
      [5, 6, 7, 8, 9],
      [null, 'A', 'B', 'C', null],
      [null, null, 'D', null, null],
    ],
    result = [],
    indexes = [],
    row = 2,
    col = 0,
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

  if ((lines[lineIdx].length-1 === i)) {
    result.push(keypad[row][col]);
    indexes.push(i);
    iteration = 0;
  }
}

lines.forEach(function(line, lineIdx) {
  line.forEach(function(s, i) {
    if (s === 'L') {
      if (col > 0 && keypad[row][col-1] !== null) {
        col--;
      }
      if ((line.length -1 === i) || ((line.length -1 !== i) && col === 0)) {
        push(s, i, lineIdx)
      }
    } else if (s === 'R') {
      if (col < 4 && keypad[row][col+1] !== null) {
        col++;
      }
      if ((line.length -1 === i) || ((line.length -1 === i) && col === 4)) {
        push(s, i, lineIdx)
      }
    } else if (s === 'U') {
      if (row > 0 && keypad[row-1][col] !== null) {
        row--;
      }
      if ((line.length -1 === i) || ((line.length -1 === i) && row === 0)) {
        push(s, i, lineIdx)
      }
    } else if (s === 'D') {
      if (row < 4 && keypad[row+1][col] !== null) {
        row++;
      }
      if ((line.length -1 === i) || ((line.length -1 === i) &&row === 4)) {
        push(s, i, lineIdx)
      }
    }

    last = s;
  });
});

console.log(result.join(''));