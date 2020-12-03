const fs = require("fs");
const inputPath = process.argv[2];
const input = fs.readFileSync(inputPath, "utf8");
const inputArr = input.split("\n");

function treeCount(right, down) {
  let col = right;
  let row = down;
  let count = 0;
  
  while(row < inputArr.length) {
    if(col > inputArr[row].length - 1) col -= inputArr[row].length;
    if(inputArr[row][col] === '#') count++;
    col += right;
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