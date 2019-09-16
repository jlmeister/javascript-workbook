"use strict"

// 1. Use a do..while loop to console log the numbers from 1 to 1000.
// let i = 0;

// do {
//   i++;
//   console.log(i);
// } while(i<1000);

// 2. Create an object called person with the following data:
// firstName: "Jane"
// lastName: "Doe"
// birthDate: "Jan 5, 1925"
// gender: "female"

// const person = {
//   firstName: "Jane",
//   lastName: "Doe",
//   birthDate: "Jan 5, 1925",
//   gender: "female"
// }
// console.log(person);

// 3. Use a for...in loop and if statement to console.log the value associated with the key birthDate if the birth year is an odd number.

let year = /\d{4}/; // match any string of four digits, i.e., a year.

// for (let property in person) {
//   if (property == "birthDate" && year.exec(person[property]) % 2 == 1) {
//       console.log(person[property]);
//   }
// }

// 4. Create an arrayOfPersons that contains mulitiple objects. You can simply copy/paste the person object you made above multiple times. Feel free to change the values to reflect multiple people you might have in your database.

let arrayOfPersons = [
  {
    firstName: "Jane",
    lastName: "Doe",
    birthDate: "Jan 5, 1979",
    gender: "female"
  },
  {
    firstName: "John",
    lastName: "Doe",
    birthDate: "Feb 5, 1948",
    gender: "male"
  },
  {
    firstName: "Jackson",
    lastName: "Doe",
    birthDate: "Mar 5, 1989",
    gender: "male"
  },
  {
    firstName: "Joey",
    lastName: "Doe",
    birthDate: "Apr 5, 1995",
    gender: "male"
  },
  {
    firstName: "Julia",
    lastName: "Doe",
    birthDate: "May 5, 1983",
    gender: "female"
  }
]

// 5. Use .map() to map over the arrayOfPersons and console.log() their information.
// arrayOfPersons.map(person => console.log(person));

// 6. Use .filter() to filter the persons array and console.log only males in the array.
// arrayOfPersons.filter(person => {
//   if(person.gender == "male")
//     console.log(person);
// });

// 7. Use .filter() to filter the persons array and console.log only people that were born before Jan 1, 1990.
arrayOfPersons.filter(person => {
  if(year.exec(person.birthDate) < 1990)
    console.log(person);
});