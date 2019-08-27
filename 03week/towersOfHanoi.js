'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};

function printStacks() {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

function movePiece() {
  // Your code here

}

function isLegal() {
  // Your code here

}

function checkForWin() {
  // Your code here

}

function towersOfHanoi(startStack, endStack) {
  // Your code here

}

function getPrompt() {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });

  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });
  });

} else {

  getPrompt();

}



/* Towers of Hanoi Logic

Object of the game is to move all the pieces from the first stack to the last stack.

*** Rules ***
- Can only move one piece at a time
- Can only remove the top piece from a given stack
- Can only place a piece on an empty stack or on a larger piece
- The placed piece must go on top of the new stack

*** Code map and pseudocode ***

towersOfHanoi(startStack, endStack)
- check to see if the entries are valid.
- check to see if the move is valid.
- if entries and move are valid, move the piece.
- after moving the piece, check to see if win condition is met.

isLegal()
- check to see if the entries for startStack and endStack are 'a', 'b', or 'c'.
- check to make sure startStack has a block to move (i.e. isn't empty)
- if endStack is empty and startStack isn't, the move is legal. return true.
- if endStack isn't empty, compare values of the last index of startStack and the last index of endStack.
- if the last index of startStack is smaller than the last index of endStack, the move is legal. return true.
- otherwise, it's invalid.

movePiece()
- already checked to see if the move is legal, so just need to pop() from startStack and push() to endStack

checkForWin()
- return true if the contents of stacks.c is equal to [4, 3, 2, 1]. */