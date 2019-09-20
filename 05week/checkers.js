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
    const rowFrom = from.charAt(0);
    const colFrom = from.charAt(1);
    const toRow = to.charAt(0);
    const toCol = to.charAt(1);
    let gameBoard = this.board.grid;

    if(this.isLegalInput(from, to)) {
      console.log(this.moveType(from, to));
      // {
      //   gameBoard[rowFrom][colFrom] = null;
      //   gameBoard[toRow][toCol] = this.board.playerTurn;
      //   this.switchPlayer();
      // }
    }
    else console.log("invalid input.");
  }
  switchPlayer() {
    let red = this.board.red.toLowerCase();
    let black = this.board.black.toLowerCase();

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

    if(wantToJump[fromRow][fromCol] == this.board.playerTurn) {
      if(!wantToJump[toRow][toCol]) {
        if((this.board.playerTurn == this.board.red && distance < 0) || (this.board.playerTurn == this.board.black && distance > 0)) {
          if(Math.abs(distance) == 9 || Math.abs(distance) == 11) {
            return 'normal';
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
                return 'jump';
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

    return 'illegal';



    // Legal Move Tests:
    // 1. Does the location of the "from" location (first input) contain a piece, and does it match the current player's turn?
    // if(wantToJump[fromRow][fromCol] != this.board.playerTurn) {
    //   console.log("Choose one of your own pieces to move.");
    //   return false;
    // }
    // // 2. Is the location of the "to" location (second input) empty?
    // if(wantToJump[toRow][toCol]) {
    //   console.log("There's a piece there already.")
    //   return false;
    // }
    // // 3. Is the move in the right direction?
    // if((this.board.playerTurn == this.board.red && distance > 0) || (this.board.playerTurn == this.board.black && distance < 0)) {
    //   console.log("Wrong direction.");
    //   return false;
    // }
    // // 4. Is the difference between the two locations a multiple of 9 or 11? (i.e. is it a diagonal move?)
    // if(Math.abs(distance) % 9 != 0 && Math.abs(distance) % 11 != 0) {
    //   console.log("Illegal move. That's not diagonal, silly!")
    //   return false;
    // }
    // // 5. Are you trying to move more than two diagonal 
    // // 4. If not moving to an adjacent diagonal square, is the destination two squares away, and is there an opposing piece in the middle? (i.e. are you jumping over another piece?)
    // if(Math.abs(distance) == 18 || Math.abs(distance) == 22) {
    //   let over = ((Number(from) + Number(to)) / 2).toString().split('');
    //   console.log(wantToJump[over[0]][over[1]]);
    //   if(!wantToJump[over[0]][over[1]]) {
    //     console.log("One space at a time...");
    //     return false;
    //   }
    //   if(wantToMove[over[0]][over[1]] == this.board.playerTurn) {
    //     console.log("You can only jump over opposing pieces.");
    //     return false;
    //   }
    // }
    


    // // if(legal === true)
    //   // console.log('Good job, genius... 🙄');
    // return true;
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
