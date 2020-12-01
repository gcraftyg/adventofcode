const fs = require("fs");
const inputPath = process.argv[2];

const input = fs.readFileSync(inputPath, "utf8");
const inputArr = input
  .split("\n")
  .map((v) => parseInt(v))
  .filter((v) => v);

function matchSum(arr, sum) {
  const pairs = new Map();

  for (let i = 0; i < arr.length; i++) {
    let a = arr[i];

    for (let j = i + 1; j < arr.length; j++) {
      let b = arr[j];
      let diff = sum - a - b;
      pairs.set(diff, [a, b]);

      for (let k = j + 1; k < arr.length; k++) {
        let c = arr[k];
        if (pairs.get(c)) return [...pairs.get(c), c];
      }
    }
  }
  return [];
}

const [a, b, c] = matchSum(inputArr, 2020);
console.log(a, b, c);
console.log(a * b * c);
