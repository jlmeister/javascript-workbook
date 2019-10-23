'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


class Checker {
  constructor(color) {
    this.symbol = color == 'r' ? 'r' : 'b';
    this.isKing = false;
  }
  kingMe() {
    this.isKing = true;
    this.symbol = this.symbol.toUpperCase();
  }
}

class Board {
  constructor() {
    this.grid = [];
    this.checkers = [];
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
          rowOfCheckers.push(this.grid[row][column].symbol);
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
          const checker = new Checker('r');
          this.grid[row][col] = checker;
          this.checkers.push(this.grid[row][col]);
        }
      }
    }
    for(let row = 5; row < 8; row++) {
      for(let col = 0; col < 8; col++) {
        if((row + col) % 2 == 1) {
          const checker = new Checker('b');
          this.grid[row][col] = checker;
          this.checkers.push(this.grid[row][col]);
        }
      }
    }
  }
  selectChecker(row, col) {
    return this.grid[row][col];
  }
  killChecker(row, col) {
    const checker = this.grid[row][col];
    if(checker.symbol.toUpperCase() == 'R')
      this.checkers.shift(); // red checkers are in first half of array. remove a red checker.
    else
      this.checkers.pop(); // black checkers are in second half of array. remove a black checker.

    this.grid[row][col] = null;
  }
}

class Game {
  constructor() {
    this.board = new Board;
    this.redPlayer = 'r';
    this.blackPlayer = 'b';
    this.playerTurn = this.blackPlayer;
  }
  start() {
    this.board.createGrid();
    this.board.createCheckers();
  }
  moveChecker(from, to) {
    const gameBoard = this.board.grid;
    
    if(this.isLegalInput(from, to)) {
      const rowFrom = from.charAt(0), colFrom = from.charAt(1), toRow = to.charAt(0), toCol = to.charAt(1);
      const checker = this.board.selectChecker(rowFrom, colFrom);
      const moveMessage = this.moveType(from, to);
      
      switch(moveMessage) {
        case 'normal':
          gameBoard[toRow][toCol] = checker;
          gameBoard[rowFrom][colFrom] = null;
          if((this.playerTurn == this.redPlayer && toRow == 7) || (this.playerTurn == this.blackPlayer && toRow == 0))
            checker.kingMe();
          this.switchPlayer();
          break;
        case 'jump':
          const over = ((Number(from) + Number(to)) / 2).toString();
          gameBoard[toRow][toCol] = checker;
          gameBoard[rowFrom][colFrom] = null;
          this.board.killChecker(over.charAt(0), over.charAt(1));
          if((this.playerTurn == this.redPlayer && toRow == 7) || (this.playerTurn == this.blackPlayer && toRow == 0))
          checker.kingMe();
          
          const jumpAgain = this.findAnotherJump(to);
          if(jumpAgain) {
            const newFrom = to, newTo = jumpAgain;
            this.moveChecker(newFrom, newTo);
          }
          this.switchPlayer();
          break;
        default:
          console.log(moveMessage);
          break;
      }
    }
    else console.log("invalid input.");
  }
  switchPlayer() {
    this.playerTurn = this.playerTurn == this.redPlayer ? this.blackPlayer : this.redPlayer;
  }
  isLegalInput(from, to) {
    // test each input to see that they are only two digits between 0 and 7.
    const legal = /^[0-7][0-7]$/;
    return legal.test(from) && legal.test(to);
  }
  moveType(from, to) {
    const fromRow = from.charAt(0);
    const fromCol = from.charAt(1);
    const toRow = to.charAt(0);
    const toCol = to.charAt(1);
    const wantToJump = this.board.grid;
    const distance = from - to;
    let moveType = 'illegal';

    if(wantToJump[fromRow][fromCol] && wantToJump[fromRow][fromCol].symbol.toUpperCase() == this.playerTurn.toUpperCase()) {
      if(!wantToJump[toRow][toCol]) {
        if(((this.playerTurn == this.redPlayer && distance < 0) || (this.playerTurn == 'b' && distance > 0)) && !wantToJump[fromRow][fromCol].isKing) {
          if(Math.abs(distance) == 9 || Math.abs(distance) == 11) {
            moveType = 'normal';
          }
          else if(Math.abs(distance) == 18 || Math.abs(distance) == 22) {
            const over = ((Number(from) + Number(to)) / 2).toString().split('');
            if(!wantToJump[over[0]][over[1]])
              moveType = "Can't jump over an empty space.";
            else if (wantToJump[over[0]][over[1]].symbol == this.playerTurn)
              moveType = "Can't jump over your own pieces.";
            else
              moveType = 'jump';
          }
          else
            moveType = "Illegal Move.";
        }
        else if(wantToJump[fromRow][fromCol].isKing) {
          if(Math.abs(distance) == 9 || Math.abs(distance) == 11) {
            moveType = 'normal';
          }
          else if(Math.abs(distance) == 18 || Math.abs(distance) == 22) {
            const over = ((Number(from) + Number(to)) / 2).toString().split('');
            if(!wantToJump[over[0]][over[1]])
              moveType = "Can't jump over an empty space.";
            else if (wantToJump[over[0]][over[1]].symbol == this.playerTurn)
              moveType = "Can't jump over your own pieces.";
            else
              moveType = 'jump';
          }
          else
            moveType = "Illegal Move.";
        }
        else
          moveType = "You can't move backwards, silly!";
      }
      else
        moveType = "There's already a piece there.";
    }
    else {
      moveType = "Choose one of your own pieces to move.";
    }

    return moveType;
  }
  findAnotherJump(position) {
    const checker = this.board.selectChecker(position.charAt(0), position.charAt(1));
    const jumpDirection = [-22, -18, 18, 22];
    let foundJump = null;

    if(checker.isKing || this.playerTurn == this.blackPlayer) {
      for(let i = 0; i < 2; i++) {
        const testJumpPosition = Number(position) + jumpDirection[i];
        if(testJumpPosition >= 10 && this.moveType(position, testJumpPosition.toString()) == 'jump')
          foundJump = testJumpPosition;
        else if(testJumpPosition > 0 && this.moveType(position, '0'.concat(testJumpPosition.toString())) == 'jump')
          foundJump = '0'.concat(testJumpPosition.toString());
      }
    }
    if(checker.isKing || this.playerTurn == this.redPlayer) {
      for(let j = 2; j < 4; j++) {
        const testJumpPosition = Number(position) + jumpDirection[j];
        if(testJumpPosition < 77 && this.moveType(position, testJumpPosition.toString()) == 'jump')
          foundJump = testJumpPosition;
      }
    }
    if(foundJump != null)
      return foundJump.toString();
    else
      return foundJump;
  }
}

function getPrompt() {
  game.board.viewGrid();
  console.log(game.playerTurn);
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
