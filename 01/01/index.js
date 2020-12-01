const fs = require("fs");
const inputPath = process.argv[2];

const input = fs.readFileSync(inputPath, "utf8");
const inputArr = input.split("\n");

function matchSum(arr, sum) {
  const pairs = {};

  for (let v of arr) {
    if (pairs[v]) return [pairs[v], parseInt(v)];

    pairs[sum - v] = parseInt(v);
  }
}

const [a, b] = matchSum(inputArr, 2020);
console.log(a * b);
