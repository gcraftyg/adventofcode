const fs = require("fs");
const inputPath = process.argv[2];

const input = fs.readFileSync(inputPath, "utf8");
const inputArr = input
  .split("\n");

function isValidPassword(password, min, max, char) {
  let charCount = 0;

  for(let c of password) {
    if(c === char) {
      charCount++;
    }
  }

  return charCount >= min && charCount <= max;
}

let count = 0;

for(let p of inputArr) {
  const [criteria, password] = p.split(": ");
  const [_, min, max, char] = criteria.match(/(\d+)-(\d+)\s(\w)/);
  if(isValidPassword(password, min, max, char)) {
    count++;
  }
}

console.log(count);