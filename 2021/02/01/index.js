const fs = require("fs");
const inputPath = process.argv[2];

const input = fs.readFileSync(inputPath, "utf8");
const inputArr = input.split("\n");
const movements = inputArr.map(v => v.split(' ')).map(([dir, amount]) => [dir, parseInt(amount)]);

function depth(moves) {
  let horizontal = 0;
  let depth = 0;

  for(let [dir, amount] of moves) {
    if(dir === 'down') {
      depth += amount;
    } else if(dir === 'up') {
      depth -= amount;
    } else if(dir === 'forward') {
      horizontal += amount;
    }
  }

  return horizontal * depth;
}

console.log(depth(movements));

