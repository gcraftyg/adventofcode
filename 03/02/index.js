const fs = require("fs");
const inputPath = process.argv[2];
const input = fs.readFileSync(inputPath, "utf8");
const inputArr = input.split("\n");

function treeCount(right, down) {
  let col = 0;
  let row = 0;
  let count = 0;
  const maxCol = inputArr[0].length;
  const maxRow = inputArr.length;
  
  while(row < maxRow) {
    if(inputArr[row][col] === '#') count++;
    col = (col + right) % maxCol;
    row += down;
  }
  
  return count;
}

const slopes = [[1,1], [3,1], [5,1], [7,1], [1,2]];
const total = slopes.reduce((sum, [right, down]) => {
  sum = (sum || 1) * treeCount(right, down);
  return sum;
}, 0);

console.log(total);