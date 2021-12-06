const fs = require("fs");
const inputPath = process.argv[2];

const input = fs.readFileSync(inputPath, "utf8");
const data = input.split("\n");

const numbersToDraw = data[0].split(',');
const gameBoards = ingestGameBoards(data.slice(2).filter(v => v !== ''));

function ingestGameBoards(boardData) {
  const SIZE = 5;
  const boards = [];
  let i = 0;
  
  while(i < boardData.length) {
    const boardRows = boardData.slice(i, i + SIZE);
    const converted = boardRows.map(row => {
      const rowNumbers = row.split(' ').filter(v => v !== '');
      return rowNumbers.map(x => [x,0]);
    });
    boards.push(converted);
    i += SIZE;
  }
  return boards;
}

function markMatch(board, numberToMatch) {
  let hasMatch = false;
  let row = 0;

  while (!hasMatch && row < board.length) {
    board[row].forEach(cell => {
      if(cell[0] === numberToMatch) {
        cell[1] = 1;
        hasMatch = true;
      }
    });

    row++;
  }

  return hasMatch;
}

function checkWinner(board) {
  // check rows
  for(let i=0;i<board.length;i++) {
    const rowTotal = board[i].reduce((sum, cur) => {
      sum += cur[1];
      return sum;
    }, 0);

    if(rowTotal === 5) return true;
  }

  // check cols
  for(let col = 0;col<board.length;col++) {
    let colTotal = 0;
    const rowSize = board[0].length;
    for(let row = 0;row<rowSize;row++) {
      colTotal += board[row][col][1];
    }
    if(colTotal === board.length) return true;
  }
}

function findWinner(drawings, boards) {
  let drawingCount = 0;
  let winners = new Set();
  let lastWinningDraw;

  while(drawingCount < drawings.length) {
    const numberDrawn = drawings[drawingCount];
    for(let i=0;i<boards.length;i++) {
      if(winners.has(boards[i])) continue;

      const hasMatch = markMatch(boards[i], numberDrawn);
      if (hasMatch && checkWinner(boards[i])) {
        winners.add(boards[i]);
        lastWinningDraw = numberDrawn;
      }
    }
    drawingCount++;
  }

  const lastWinner = Array.from(winners.values()).pop();

  return {lastWinner, winningDraw: lastWinningDraw};
}

const {lastWinner, winningDraw} = findWinner(numbersToDraw, gameBoards);

function sum(arr) {
  return arr.reduce((sum, cur) => {
    return sum += cur
  }, 0);
}

function findUnmarkedCells(row) {
  return row.filter(v => v[1] === 0);
}

function numericValueOfCells(cells) {
  return cells.map(v => parseInt(v[0]));
}

const unmarkedCellsByRow = lastWinner.map(r => sum(numericValueOfCells(findUnmarkedCells(r))));
const sumOfUnmarkedCells = sum(unmarkedCellsByRow);

console.log(sumOfUnmarkedCells * parseInt(winningDraw));
// 6256