const fs = require("fs");
const inputPath = process.argv[2];

const input = fs.readFileSync(inputPath, "utf8");
const answerGroups = input
  .split("\n\n");


function responseSum(groups) {
  return groups.reduce((sum, group) => {
    let unique = new Set();
    for(let response of group.split('\n')) {
      unique = new Set([...unique, ...response.split('')]);
    }
    return sum += unique.size;;
  }, 0);
}


console.log(responseSum(answerGroups));