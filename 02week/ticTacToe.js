'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
let board = [
  [' ', ' ', ' '],
  [' ', ' ', ' '],
  [' ', ' ', ' ']
];

let playerTurn = 'X';
let turnCount = 0;

function printBoard() {
  console.log('   0  1  2');
  console.log('0 ' + board[0].join(' | '));
  console.log('  ---------');
  console.log('1 ' + board[1].join(' | '));
  console.log('  ---------');
  console.log('2 ' + board[2].join(' | '));
}

function gameReset() {
  for(let i = 0; i < 3; i++) {
    for(let j = 0; j < 3; j++) {
      board[i][j] = ' ';
    }
  }
  turnCount = 0;
}

function changePlayer() {
  if (playerTurn === 'X') {
    playerTurn = 'O';
  }
  else playerTurn = 'X';
}

function horizontalWin() {
  for(let i = 0; i < 3; i++) {
    if (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] !== ' ') {
      return true;
    }
  }
}

function verticalWin() {
  for(let i = 0; i < 3; i++) {
    if (board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[0][i] !== ' ') {
      return true;
    }
  }
}

function diagonalWin() {
  if ((board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== ' ') || (board[2][0] === board[1][1] && board[1][1] === board[0][2] && board[2][0] !== ' ')) {
    return true;
  }
}

function checkForWin() {
  return horizontalWin() || verticalWin() || diagonalWin();
}

function ticTacToe(row, column) {
  console.clear();

  if (!isNaN(row) && row >= 0 && row < 3 && !isNaN(column) && column >= 0 && column < 3) {
    if (board[row][column] === ' ') {
      turnCount++;
      board[row][column] = playerTurn;
      if (checkForWin()) {
        console.log(`Player ${playerTurn} wins!`);
        gameReset();
      }
      else if (turnCount === 9) {
        console.log("It's a tie!")
        gameReset();
      }
      changePlayer();
    }
    else console.log("Invalid move. Try again.")
  }
  else console.log("Invalid input. Try again.");
}

function getPrompt() {
  printBoard();
  console.log("It's Player " + playerTurn + "'s turn.");
  rl.question('row: ', (row) => {
    rl.question('column: ', (column) => {
      ticTacToe(row, column);
      getPrompt();
    });
  });

}



// Tests

if (typeof describe === 'function') {

  describe('#ticTacToe()', () => {
    it('should place mark on the board', () => {
      ticTacToe(1, 1);
      assert.deepEqual(board, [ [' ', ' ', ' '], [' ', 'X', ' '], [' ', ' ', ' '] ]);
    });
    it('should alternate between players', () => {
      ticTacToe(0, 0);
      assert.deepEqual(board, [ ['O', ' ', ' '], [' ', 'X', ' '], [' ', ' ', ' '] ]);
    });
    it('should check for vertical wins', () => {
      board = [ [' ', 'X', ' '], [' ', 'X', ' '], [' ', 'X', ' '] ];
      assert.equal(verticalWin(), true);
    });
    it('should check for horizontal wins', () => {
      board = [ ['X', 'X', 'X'], [' ', ' ', ' '], [' ', ' ', ' '] ];
      assert.equal(horizontalWin(), true);
    });
    it('should check for diagonal wins', () => {
      board = [ ['X', ' ', ' '], [' ', 'X', ' '], [' ', ' ', 'X'] ];
      assert.equal(diagonalWin(), true);
    });
    it('should detect a win', () => {
      assert.equal(checkForWin(), true);
    });
  });
} else {

  getPrompt();

}
