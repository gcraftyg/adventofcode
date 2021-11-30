const fs = require("fs");
const inputPath = process.argv[2];

const input = fs.readFileSync(inputPath, "utf8");
const answerGroups = input
  .split("\n\n");

function sameAnswerCount(counts, groupSize) {
  let sum = 0;
  for(let c of counts) {
    if(c === groupSize) sum++;
  }
  return sum;
}

function responseCounts(responses) {
  return responses.reduce((responsMap, response) => {
    for(let answer of response) {
      responsMap.set(answer, (responsMap.get(answer) ?? 0) + 1);
    }
    return responsMap;
  }, new Map()).values();
}

function responseSum(groups) {
  return groups.reduce((sum, group) => {
    const responses = group.split('\n');  
    return sum += sameAnswerCount(responseCounts(responses), responses.length);
  }, 0);
}


console.log(responseSum(answerGroups));