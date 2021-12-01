const fs = require("fs");
const inputPath = process.argv[2];

const input = fs.readFileSync(inputPath, "utf8");
const inputArr = input.split("\n");

function increaseCount(arr) {
  let increase = 0;
  let prev;

  for (let v of arr) {
    const num = parseInt(v);
    
    if(prev && num > prev) {
        increase++;
    } 

    prev = num;
  }

  return increase;
}

console.log(increaseCount(inputArr));

