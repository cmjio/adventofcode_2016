/**
  --- Part Two ---

  You finally arrive at the bathroom (it's a several minute walk from the lobby so visitors can behold the many fancy conference rooms and water coolers on this floor) and go to punch in the code. Much to your bladder's dismay, the keypad is not at all like you imagined it. Instead, you are confronted with the result of hundreds of man-hours of bathroom-keypad-design meetings:

      1
    2 3 4
  5 6 7 8 9
    A B C
      D
  You still start at "5" and stop when you're at an edge, but given the same instructions as above, the outcome is very different:

  You start at "5" and don't move at all (up and left are both edges), ending at 5.
  Continuing from "5", you move right twice and down three times (through "6", "7", "B", "D", "D"), ending at D.
  Then, from "D", you move five more times (through "D", "B", "C", "C", "B"), ending at B.
  Finally, after five more moves, you end at 3.
  So, given the actual keypad layout, the code would be 5DB3.

  Using the same instructions in your puzzle input, what is the correct bathroom code?
**/
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
