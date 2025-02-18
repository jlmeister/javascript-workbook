'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


function pigLatin(word) {
  
  // Is this a single word? Convert it!
  if (!word.includes(' ') && word.length > 0) {
    // DECLARE VARIABLES:
    // 1. array to hold passed word
    // 2. empty array to take the front of it,
    // 3. and a function to test for vowels.
    let letters = word.trim().toLowerCase().split('');
    let front = [];
    const isVowel = (char) => {
      const vowels = ['a', 'e', 'i', 'o', 'u'];
      for(let i = 0; i < vowels.length; i++) {
        if (vowels[i] === char) {
          return true;
        }
      }
      return false;
    }
  
    // iterate on the first letter of the word until it is a vowel, shifting it to a separate array each iteration.
    while(!isVowel(letters[0])) {
      front.push(letters.shift());
    }
    
    // If front array is empty after the loop, then the word started with a vowel and we add 'yay' to the end.
    // Otherwise, add 'ay' to front array, then add front to the end.
    // Return the word translated to Pig Latin.
    if (front.length === 0) {
      letters.push('yay');
      return letters.join('');
    }
    else {
      front.push('ay');
      letters.push(front.join(''));
      return letters.join('');
    }
  }
  // If it isn't a single word, split it into individual words and convert each of them.
  else if (word.length > 0) {
    let multiWords = word.split(' ');
    let converted = [];

    for(let i = 0; i < multiWords.length; i++) {
      if (multiWords[i].length > 0) {
        converted.push(pigLatin(multiWords[i]));
      }
    }
    return converted.join(' ');
  }
  // If it's just an empty string, let the user know to put a string in.
  else return "Umm, I can't convert nothing into Pig Latin. Give me words!"
}


function getPrompt() {
  rl.question('word ', (answer) => {
    console.log( pigLatin(answer) );
    getPrompt();
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#pigLatin()', () => {
    it('should translate a simple word', () => {
      assert.equal(pigLatin('car'), 'arcay');
      assert.equal(pigLatin('dog'), 'ogday');
    });
    it('should translate a complex word', () => {
      assert.equal(pigLatin('create'), 'eatecray');
      assert.equal(pigLatin('valley'), 'alleyvay');
    });
    it('should attach "yay" if word begins with vowel', () => {
      assert.equal(pigLatin('egg'), 'eggyay');
      assert.equal(pigLatin('emission'), 'emissionyay');
    });
    it('should lowercase and trim word before translation', () => {
      assert.equal(pigLatin('HeLlO '), 'ellohay');
      assert.equal(pigLatin(' RoCkEt'), 'ocketray');
    });
    it('should convert multiple words', () => {
      assert.equal(pigLatin('hello world'), 'ellohay orldway');
      assert.equal(pigLatin('    write code better'), 'itewray odecay etterbay');
    });
  });
} else {

  getPrompt();

}
