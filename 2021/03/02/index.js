const fs = require("fs");
const inputPath = process.argv[2];

const input = fs.readFileSync(inputPath, "utf8");
const diagnosticBinaries = input.split("\n");

function sumBinaryColumns(binaries) {
  return binaries.reduce((sum,cur) => {
    cur.split('').forEach((v,i) => {
      sum[i] = sum[i] ? sum[i] + parseInt(v) : parseInt(v);
    });
    return sum;
  }, []);
}

function calculateGammaEpsilon(binarySums, total) {
  let gamma = '';
  let epsilon = '';

  for(let v of binarySums) {
    if(v/total === .5) {
      gamma += '1';
      epsilon += '0';
    } else {
      const commonBit = v/total > .5 ? '1' : '0';
      gamma += commonBit;
      epsilon += commonBit === '1' ? '0' : '1';
    }
  }

  return [gamma, epsilon]
}

function findClosestBinaryFor(arr, type, bitPos = 0) {
  if(arr.length === 1) return arr[0];

  const binarySums = sumBinaryColumns(arr);
  const [gamma, epsilon] = calculateGammaEpsilon(binarySums, arr.length);
  
  const comparisonChar = type === 'gamma' ? gamma.charAt(bitPos) : epsilon.charAt(bitPos);

  return findClosestBinaryFor(arr.filter(v => v.charAt(bitPos) === comparisonChar), type, bitPos += 1);
}

function lifeSupportRating(binaries) {
  const oxygen = findClosestBinaryFor(binaries, 'gamma');
  const co2 = findClosestBinaryFor(binaries, 'epsilon');
  return parseInt(oxygen, 2) * parseInt(co2, 2);
}


console.log(lifeSupportRating(diagnosticBinaries))