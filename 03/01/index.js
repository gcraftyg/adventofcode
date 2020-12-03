const fs = require("fs");
const inputPath = process.argv[2];

const input = fs.readFileSync(inputPath, "utf8");
const inputArr = input
  .split("\n");

function treeCount() {
  let row = 1;
  let col = 3;
  let count = 0;
  
  while(row < inputArr.length) {
    if(col > inputArr[row].length - 1) {
      col = col - inputArr[row].length;
    }

    if(inputArr[row][col] === '#') count++;
    
    col = col + 3;
    row++;
  }
  
  return count;
}

console.log(treeCount());