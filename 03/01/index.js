const fs = require("fs");
const inputPath = process.argv[2];

const input = fs.readFileSync(inputPath, "utf8");
const inputArr = input
  .split("\n");

function treeCount() {
  let row = 1;
  let col = 3;
  let maxCol = inputArr[0].length - 1;
  
  let count = 0;
  
  while(row < inputArr.length) {
    if(inputArr[row][col] === '#') count++;
    col = col + 3;
    row++;
  }

  return count;
}

// function bruteForce() {

//   let data = '';
  
//   inputArr.forEach(v => {
//     data += `${repeatRow(v)}\n`;
//   });
  
//   fs.writeFileSync('03/01/brute.txt', data);
  
//   function repeatRow(row) {
//     let count = 0;
//     let output = row;
//     while(count < 100) {
//       output = `${output}${row}`;
//       count++;
//     }

//     return output;
//   }
// }

// bruteForce();
console.log(treeCount());