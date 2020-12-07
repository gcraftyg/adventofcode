const fs = require("fs");
const inputPath = process.argv[2];

const input = fs.readFileSync(inputPath, "utf8");
const inputArr = input
  .split("\n");

function parseBags(bags) {
  return bags.reduce((sum, cur) => {
    const [bag, children] = cur.split('contain');
    sum.set(bag.replace(' bags ', ''), new Set(children.split(',').map(v => v.replace(/[\d|\.]/g, '').replace(/bags|bag$/, '').trim())))
    return sum;
  }, new Map());
}

function bagCount(bagMap, type, unique) {
  if(!bagMap.has(type)) return;
  
  for(let [bagType, children] of bagMap) {
    if(children.has(type)) {
      unique.add(bagType);
      bagCount(bagMap, bagType, unique);
    }
  }

  return unique;
}
const bagMap = parseBags(inputArr);
const uniqueBags = bagCount(bagMap, 'shiny gold', new Set());
console.log(uniqueBags.size);

