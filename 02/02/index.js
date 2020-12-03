const fs = require("fs");
const inputPath = process.argv[2];

const input = fs.readFileSync(inputPath, "utf8");
const inputArr = input
  .split("\n");

function isValidPassword(char, charA, charB) {
  return charA !== charB && (charA === char || charB === char);
}

let count = 0;

for(let p of inputArr) {
  const [_, indexA, indexB, char, password] = p.match(/(\d+)-(\d+)\s(\w):\s(.*)/);
  if(isValidPassword(char, password[indexA - 1], password[indexB - 1])) count++;
}

console.log(count);