const fs = require("fs");
const inputPath = process.argv[2];

const input = fs.readFileSync(inputPath, "utf8");
const inputArr = input
  .split("\n");

function treeCount() {
  let col = 0;
  let row = 0;
  let count = 0;
  const maxCol = inputArr[0].length;
  const maxRow = inputArr.length;
  
  while(row < maxRow) {
    if(inputArr[row][col] === '#') count++;
    col = (col + 3) % maxCol;
    row++;
  }
  
  return count;
}

console.log(treeCount());