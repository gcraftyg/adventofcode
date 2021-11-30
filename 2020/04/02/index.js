const fs = require("fs");
const inputPath = process.argv[2];
const input = fs.readFileSync(inputPath, "utf8");
const inputArr = input.split("\n\n");

function range(min, val, max) {
  return parseInt(val) >= min && parseInt(val) <= max;
}

const validations = {
  byr: (val) => range(1920, val, 2003),
  iyr: (val) => range(2010, val, 2020),
  eyr: (val) => range(2020, val, 2030),
  hgt: (val) => {
    const [_, num, unit] = val.match(/^(\d+)(cm|in)$/) || [];
    if(unit === 'cm') return range(150, num, 193);
    if(unit === 'in') return range(59, num, 76);
    return false;
  },
  hcl: (val) => val.match(/^#([0-9|a-f]{6})$/),
  ecl: (val) => val.match(/^amb|blu|brn|gry|grn|hzl|oth$/),
  pid: (val) => val.match(/^[0-9]{9}$/)
}

function isValidPassport(passport) {
  let requiredFields = new Set(['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']);

  for(let f of passport) {
    const [_, field, val] = f.match(/^(.*):(.*)$/);
    if(validations[field] && validations[field](val)) requiredFields.delete(field);
  }

  return requiredFields.size === 0;
}

function validatePassports() {
  let validCount = 0;
  
  for(let p of inputArr) {
    if(isValidPassport(p.split(/\n|\s/))) validCount++;
  }
  
  return validCount;
}

console.log(validatePassports());