const fs = require("fs");
const inputPath = process.argv[2];

const input = fs.readFileSync(inputPath, "utf8");
const inputArr = input
  .split("\n");

function decode(str, total, leftChar, rightChar) {
  let left = 0;
  let right = total;
  let mid = Math.floor(left + right / 2);

  for(let c of str) {
    if(c === leftChar) {
      right = mid;
    } else if(c === rightChar) {
      left = mid;
    }
    mid = Math.floor((left + right) / 2);
  }
  return mid;
}

function decodeSeatIds() {
  return inputArr.map(pass => {
    const [_, row, column] = pass.match(/^(.{7})(.{3})$/)
    const rowNum = decode(row, 128, 'F', 'B')
    const colNum = decode(column, 8, 'L', 'R');
    const seatId = (rowNum * 8) + colNum;
    return seatId;
  });
}


function findMySeat() {
  const seatIds = decodeSeatIds().sort((a,b) => a - b);
  let mySeat;
  for(let i = 1; i<seatIds.length; i++) {
    if(seatIds[i-1] !== seatIds[i] - 1) {
      return seatIds[i] - 1;
    }
  }
  return mySeat;
}

console.log(findMySeat());