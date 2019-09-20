'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


function Checker(color) {
  this.color = color;
  // this.position = position.toString().split('');
  this.isKing = false;
}

class Board {
  constructor() {
    this.grid = [];
    this.red = 'r';
    this.black = 'b';
    this.checkers = [];
    this.playerTurn = this.black;
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
  createCheckers() {
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
  killChecker(row, col) {
    if(this.grid[row][col] == this.red)
      this.checkers.shift(); // red checkers are in first half of array. remove a red checker.
    else
      this.checkers.pop(); // black checkers are in second half of array. remove a black checker.

    this.grid[row][col] = null;
  }
}

class Game {
  constructor() {
    this.board = new Board;
  }
  start() {
    this.board.createGrid();
    this.board.createCheckers();
  }
  moveChecker(from, to) {
    const rowFrom = from.charAt(0);
    const colFrom = from.charAt(1);
    const toRow = to.charAt(0);
    const toCol = to.charAt(1);
    let gameBoard = this.board.grid;

    if(this.isLegalInput(from, to)) {
      switch(this.moveType(from, to)) {
        case 'normal':
          gameBoard[rowFrom][colFrom] = null;
          gameBoard[toRow][toCol] = this.board.playerTurn;
          this.switchPlayer();
          break;
        case 'jump':
          let over = ((Number(from) + Number(to)) / 2).toString().split('');
          gameBoard[rowFrom][colFrom] = null;
          gameBoard[toRow][toCol] = this.board.playerTurn;
          this.board.killChecker(over[0], over[1]);
          this.switchPlayer();
          break;
        case 'illegal':
          console.log("Try again.");
          break;
      }
    }
    else console.log("invalid input.");
  }
  switchPlayer() {
    let red = this.board.red;
    let black = this.board.black;

    if(this.board.playerTurn == red)
      this.board.playerTurn = black;
    else
      this.board.playerTurn = red;
  }
  isLegalInput(from, to) {
    // test each input to see that they are only two digits between 0 and 7.
    let legal = /^[0-7][0-7]$/;
    return legal.test(from) && legal.test(to);
  }
  moveType(from, to) {
    const fromRow = from.charAt(0);
    const fromCol = from.charAt(1);
    const toRow = to.charAt(0);
    const toCol = to.charAt(1);
    let wantToJump = this.board.grid;
    let distance = from - to;
    let moveType = 'illegal';

    if(wantToJump[fromRow][fromCol] == this.board.playerTurn) {
      if(!wantToJump[toRow][toCol]) {
        if((this.board.playerTurn == this.board.red && distance < 0) || (this.board.playerTurn == this.board.black && distance > 0)) {
          if(Math.abs(distance) == 9 || Math.abs(distance) == 11) {
            moveType = 'normal';
          }
          else if(Math.abs(distance) == 18 || Math.abs(distance) == 22) {
            let over = ((Number(from) + Number(to)) / 2).toString().split('');
            switch(wantToJump[over[0]][over[1]]) {
              case null:
                console.log("Can't jump over an empty space.");
                break;
              case this.board.playerTurn:
                console.log("Can't jump over your own pieces.");
                break;
              default:
                moveType = 'jump';
            }
          }
          else
            console.log("Illegal Move.");
        }
        else
          console.log("You can't move backwards, silly!");
      }
      else
        console.log("There's already a piece there.");
    }
    else {
      console.log("Choose one of your own pieces to move.");
    }
    return moveType;
  }
}

function getPrompt() {
  game.board.viewGrid();
  console.log(game.board.playerTurn);
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
