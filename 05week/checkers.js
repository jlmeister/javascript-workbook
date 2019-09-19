'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


function Checker(color, position) {
  this.color = color;
  this.position = position;
  this.type = 'normal';
}

class Board {
  constructor() {
    this.grid = [];
    this.red = 'r';
    this.black = 'b';
    this.checkers = [];
    this.playerTurn = this.red;
  }
  // method that creates an 8x8 array, filled with null values
  createGrid() {
    // loop to create the 8 rows
    for (let row = 0; row < 8; row++) {
      this.grid[row] = [];
      // push in 8 columns of nulls
      for (let column = 0; column < 8; column++) {
        this.grid[row].push(null);
      }
    }
  }
  viewGrid() {
    // add our column numbers
    let string = "  0 1 2 3 4 5 6 7\n";
    for (let row = 0; row < 8; row++) {
      // we start with our row number in our array
      const rowOfCheckers = [row];
      // a loop within a loop
      for (let column = 0; column < 8; column++) {
        // if the location is "truthy" (contains a checker piece, in this case)
        if (this.grid[row][column]) {
          // push the symbol of the check in that location into the array
          rowOfCheckers.push(this.grid[row][column]);
        } else {
          // just push in a blank space
          rowOfCheckers.push(' ');
        }
      }
      // join the rowOfCheckers array to a string, separated by a space
      string += rowOfCheckers.join(' ');
      // add a 'new line'
      string += "\n";
    }
    console.log(string);
  }
  initializeBoard() {
    for(let row = 0; row < 3; row++) {
      for(let col = 0; col < 8; col++) {
        if((row + col) % 2 == 1) {
          this.grid[row][col] = this.red;
          this.checkers.push(this.grid[row][col]);
        }
      }
    }
    for(let row = 5; row < 8; row++) {
      for(let col = 0; col < 8; col++) {
        if((row + col) % 2 == 1) {
          this.grid[row][col] = this.black;
          this.checkers.push(this.grid[row][col]);
        }
      }
    }
  }

  // Your code here
}

class Game {
  constructor() {
    this.board = new Board;
  }
  start() {
    this.board.createGrid();
    this.board.initializeBoard();
  }
  moveChecker(from, to) {
    let fromRow = from[0], fromCol = from[1], toRow = to[0], toCol = to[1];
    if(this.isLegalInput(from, to)) {
      this.board.grid[fromRow][fromCol] = null;
  
      if(this.board.playerTurn == this.board.red) {
        this.board.grid[toRow][toCol] = this.board.red;
      }
      else if(this.board.playerTurn == this.board.black) {
        this.board.grid[toRow][toCol] = this.board.black;
      }
      this.switchPlayer();
    }
  }
  switchPlayer() {
    if(this.board.playerTurn == this.board.red)
      this.board.playerTurn = this.board.black;
    else
      this.board.playerTurn = this.board.red;
  }
  isLegalInput(from, to) {
    let legal = /^[0-7][0-7]$/;
    return legal.test(from) && legal.test(to);
  }
  isLegalMove()
}

function getPrompt() {
  game.board.viewGrid();
  rl.question('which piece?: ', (whichPiece) => {
    rl.question('to where?: ', (toWhere) => {
      game.moveChecker(whichPiece, toWhere);
      getPrompt();
    });
  });
}

const game = new Game();
game.start();


// Tests
if (typeof describe === 'function') {
  describe('Game', () => {
    it('should have a board', () => {
      assert.equal(game.board.constructor.name, 'Board');
    });
    it('board should have 24 checkers', () => {
      assert.equal(game.board.checkers.length, 24);
    });
  });

  describe('Game.moveChecker()', () => {
    it('should move a checker', () => {
      assert(!game.board.grid[4][1]);
      game.moveChecker('50', '41');
      assert(game.board.grid[4][1]);
      game.moveChecker('21', '30');
      assert(game.board.grid[3][0]);
      game.moveChecker('52', '43');
      assert(game.board.grid[4][3]);
    });
    it('should be able to jump over and kill another checker', () => {
      game.moveChecker('30', '52');
      assert(game.board.grid[5][2]);
      assert(!game.board.grid[4][1]);
      assert.equal(game.board.checkers.length, 23);
    });
  });
} else {
  getPrompt();
}
