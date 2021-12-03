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
    const commonBit = v/total > .5 ? '1' : '0';
    gamma += commonBit;
    epsilon += commonBit === '1' ? '0' : '1';
  }

  return [gamma, epsilon]
}

function powerConsumption(binaries) {
  const binarySums = sumBinaryColumns(binaries);
  const [gamma, epsilon] = calculateGammaEpsilon(binarySums, binaries.length);
  return parseInt(gamma, 2) * parseInt(epsilon, 2);
}


console.log(powerConsumption(diagnosticBinaries))