const fs = require("fs");
const inputPath = process.argv[2];

const input = fs.readFileSync(inputPath, "utf8");
const inputArr = input
  .split("\n\n");

function isValidPassport(passport) {
  let requiredFields = new Set(['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']);

  for(let f of passport) {
    const [_, field] = f.match(/^(.*):/);
    requiredFields.delete(field);
  }

  return requiredFields.size === 0;
}

let validCount = 0;

inputArr.forEach(passport => {
  if(isValidPassport(passport.split(/\n|\s/))) validCount++;
});

console.log(validCount);