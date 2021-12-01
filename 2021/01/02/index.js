const fs = require("fs");
const inputPath = process.argv[2];

const input = fs.readFileSync(inputPath, "utf8");
const inputArr = input.split("\n").map(v => parseInt(v));

function increaseCount(arr, size = 3) {
  let increase = 0;
  let prevSum;

  let i = 0;
  while(i < arr.length - size + 1) {
    const sum = arr.slice(i, i+size).reduce((sum, cur) => sum+cur, 0);
    if(prevSum && sum > prevSum) {
        increase++;
    }
    
    prevSum = sum;
    i++;
  }

  return increase;
}

console.log(increaseCount(inputArr));

