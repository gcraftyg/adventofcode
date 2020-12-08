const fs = require("fs");
const inputPath = process.argv[2];

const input = fs.readFileSync(inputPath, "utf8");
const inputArr = input
  .split("\n");

function runInstructions(instructions) {
  let acc = 0;
  let i = 0;
  let history = new Set();
  
  while(i > -1) {
    if(!instructions[i]) {
      return acc;
    }

    if(history.has(i)) {
      return false;
    }

    const [move, val] = instructions[i].split(' ');
    history.add(i);
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

function findAccBeforeLoop(instructions) {
  for(let i = 0; i<instructions.length; i++) {
    let orig = instructions[i];
    const [move, val] = instructions[i].split(' ');
    if(move !== 'acc') {
      instructions[i] = `${move === 'jmp' ? 'nop' : 'jmp'} ${val}`;
      let bar = runInstructions(instructions);
      if(bar) {
        return bar;
      } else {
        instructions[i] = orig;
      }
    }
  }
}

console.log(findAccBeforeLoop(inputArr));

