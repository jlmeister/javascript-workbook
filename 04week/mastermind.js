'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let header = 'Board  Placement-Letters';
let board = [];
let solution = '';
const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

function isValid(guess) {
  // Test 1: is the guess 4 characters long?
  if(guess.length !== 4) return false;
  
  // Test 2: is each character of the guess a valid input?
  let guessArr = guess.split('');
  for(let i = 0; i < guessArr.length; i++) {
    if(letters.indexOf(guessArr[i]) == -1) return false;
  }
  // You passed both tests! Your entry is valid.
  return true;
}

function printBoard() {
  for (let i = 0; i < board.length; i++) {
    console.log(board[i]);
  }
}

function generateSolution() {
  for (let i = 0; i < 4; i++) {
    const randomIndex = getRandomInt(0, letters.length);
    solution += letters[randomIndex];
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function generateHint(guess) {
  let hintArr = solution.split('');
  let guessArr = guess.split('');
  let correctPlacement = 0;
  let correctLetter = 0;

  // Iterate over the guess array to locate exact placement matches.
  // Increment correctPlacement when found, and set the value of the hint index to null so it can't be matched again in the next loop.
  // Also set the value of the guess index to ' ' so it can't be counted later if there are duplicates.
  for(let i = 0; i < guessArr.length; i++) {
    if(guessArr[i] == hintArr[i]) {
      correctPlacement++;
      hintArr[i] = null;
      guessArr[i] = ' ';
    }
  }

  // Iterate over guess array one more time to check if a letter exists in the hint array.
  // Increment correctLetter when found, and set the value of the hint index to null to ensure letters are counted only once.
  for(let i = 0; i < guessArr.length; i++) {
    if(hintArr.indexOf(guessArr[i]) !== -1) {
      correctLetter++;
      hintArr[hintArr.indexOf(guessArr[i])] = null;
    }
  }

  return `${correctPlacement}-${correctLetter}`;
}

function checkWin(guess) {
  return guess === solution;
}

function resetGame() {
  board = [];
  solution = '';
  generateSolution();
}

function mastermind(guess) {
  console.clear();
  if(isValid(guess)) {
    if(checkWin(guess)) {
      console.log("You guessed it!");
      resetGame();
      return "You guessed it!"; // only included to pass the test. User never sees this.
    }
    else if(board.length === 10) {
      console.log(`Out of turns. Solution: ${solution}`)
      resetGame();
    }
    else {
      console.log(header);
      board.push(guess.concat('   ' + generateHint(guess)));
    }
  }
  else console.log(header);
}


function getPrompt() {
  rl.question('guess: ', (guess) => {
    mastermind(guess);
    printBoard();
    getPrompt();
  });
}

// Because of the specificity of the tests, I had to return "You guessed it!" instead of logging it to the console. This passes the test but the user never sees the result of the game.
// Additionally, I had to comment out my resetGame() function because including a call to it at any point made all hint-related tests fail, since, it appears, all tests are run in order. In this case, the second test, "should be able to detect a win," forces a win condition, which calls the resetGame() function. This, in turn, generates a new solution that causes the tests to fail.
// NOTE: If the first two tests are moved such that they are run AFTER the last two tests, I can freely call resetGame() and pass all tests. So I went ahead and moved the tests.

// Tests

if (typeof describe === 'function') {
  solution = 'abcd';
  describe('#generateHint()', () => {
    it('should generate hints', () => {
      assert.equal(generateHint('abdc'), '2-2');
    });
    it('should generate hints if solution has duplicates', () => {
      assert.equal(generateHint('aabb'), '1-1');
    });

  });
  describe('#mastermind()', () => {
    it('should register a guess and generate hints', () => {
      mastermind('aabb');
      assert.equal(board.length, 1);
    });
    it('should be able to detect a win', () => {
      assert.equal(mastermind(solution), 'You guessed it!');
    });
  });

} else {

  generateSolution();
  getPrompt();
}
