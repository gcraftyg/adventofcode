const fs = require("fs");
const inputPath = process.argv[2];

const input = fs.readFileSync(inputPath, "utf8");
const inputArr = input
  .split("\n");

function parseChildren(children) {
  return children.split(',').map(v => v.replace(/\./, '').replace(/bags|bag$/g, '').trim());
}

function mapChildrenBags(children) {
  return parseChildren(children).reduce((sum, cur) => {
    if(cur !== 'no other') {
      const [_, count, type] = cur.match(/(\d)\s(.*)$/);
      sum.set(type, Number(count))
    }
    return sum;
  }, new Map());
}

function parseBags(bags) {
  return bags.reduce((sum, cur) => {
    const [bag, children] = cur.split('contain');
    sum.set(bag.replace(' bags ', ''), mapChildrenBags(children))
    return sum;
  }, new Map());
}

function bagCount(bagMap, type) {
  if(!bagMap.has(type)) {
    return 1;
  }

  let total = 0;
  for(let [bagType, quantity] of bagMap.get(type)) {
    total += quantity + (quantity * bagCount(bagMap, bagType));
  }
  return total;
}

const m = parseBags(inputArr);
console.log(bagCount(m, 'shiny gold'));
