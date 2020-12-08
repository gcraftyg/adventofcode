const fs = require("fs");
const inputPath = process.argv[2];

const input = fs.readFileSync(inputPath, "utf8");
const inputArr = input
  .split("\n");

function findAccBeforeLoop(instructions) {
  let acc = 0;
  let i = 0;
  let history = new Set();
  
  while(i > -1) {
    if(history.has(i) || !instructions[i]) return acc;
    
    history.add(i);
    const [move, val] = instructions[i].split(' ');
    if(move === 'acc') {
      acc += Number(val);
      i++;
    } else if(move === 'jmp') {
      i += Number(val);
    } else if(move === 'nop') {
      i++;
    }
  }
}

console.log(findAccBeforeLoop(inputArr));

