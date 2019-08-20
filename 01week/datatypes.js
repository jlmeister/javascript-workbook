"use strict"

// *** Write a JavaScript program to display the current day and time.

// function dateAndTime() {
//   let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
//   let today = new Date();
//   let date = months[today.getMonth()] + ' ' + today.getDate() + ', ' + today.getFullYear();
//   let time = today.getHours() + ':' + today.getMinutes();

//   return date + ' ' + time;
// }

// dateAndTime();


// *** Write a JavaScript program to convert a number to a string.

// function convertToString(num) {
//   return num.toString();
// }
// convertToString(3);


// *** Write a JavaScript program to convert a string to the number.

// function convertToNumber(str) {
//   return Number(str);
// }
// convertToNumber('48');


// *** Write a JavaScript program that takes in different datatypes and prints out whether they are a:
// Boolean
// Null
// Undefined
// Number
// NaN
// String

// function whatTypeIs(something) {
//   console.log(typeof(something));
// }
// whatTypeIs(true);
// whatTypeIs(42);
// whatTypeIs('42');
// whatTypeIs(null);
// whatTypeIs(undefined);
// whatTypeIs(NaN);


// *** Write a JavaScript program that adds 2 numbers together.

// function sumOf(x, y) {
//   return x + y;
// }

// sumOf(43, 89);

// *** Write a JavaScript program that runs only when 2 things are true.

// function ifBothTrue(x, y) {
//   if(x && y) {
//     return true;
//   }
// }

// ifBothTrue(1, 1);


// *** Write a JavaScript program that runs when 1 of 2 things are true.

// function ifEitherTrue(x, y) {
//   if(x || y) {
//     return true;
//   }
// }

// ifEitherTrue(1, 0);

// *** Write a JavaScript program that runs when both things are not true.

function ifNeitherTrue(x, y) {
  if(!x && !y) {
    return true;
  }
}

ifNeitherTrue(false, false);