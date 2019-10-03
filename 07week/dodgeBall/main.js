'use strict'

// ####  GLOBAL ARRAYS  ####
const arrOfPeople = [
  {
    id: 2,
    name: "Charles Young",
    age: 55,
    skillSet: "welding",
    placeBorn: "Omaha, Nebraska",
    gender: "male"
  },
  {
    id: 3,
    name: "Judy Twilight",
    age: 35,
    skillSet: "fishing",
    placeBorn: "Louisville, Kentucky",
    gender: "female"
  },
  {
    id: 4,
    name: "Cynthia Doolittle",
    age: 20,
    skillSet: "tic tac toe",
    placeBorn: "Pawnee, Texas",
    gender: "female"
  },
  {
    id: 5,
    name: "John Willouby",
    age: 28,
    skillSet: "pipe fitting",
    placeBorn: "New York, New York",
    gender: "male"
  },
  {
    id: 6,
    name: "Stan Honest",
    age: 20,
    skillSet: "boom-a-rang throwing",
    placeBorn: "Perth, Australia",
    gender: "male"
  },
  {
    id: 7,
    name: "Mia Watu",
    age: 17,
    skillSet: "acrobatics",
    placeBorn: "Los Angeles, California",
    gender: "female"
  },
  {
    id: 8,
    name: "Walter Cole",
    age: 32,
    skillSet: "jump rope",
    placeBorn: "New Orleans, Louisiana",
    gender: "male"
  },
]

const listOfPlayers = []
const blueTeam = []
const redTeam = []

/* 
  ######  DODGEBALL CODE PLAN  ######

  - The app needs to iterate through an array of people and convert them to players.
    - I will do this in a window.onload event.
  - Once all players have been created, they need to be able to be added to a team and removed from a team.
    - These events will be handled as click events on buttons created in show() functions.
  - Add to a team means:
    - Create an instance of Teammate (red or blue) from the current instance of Player.
    - Remove the current Player from the players array and add the new Teammate to the corresponding team array.
  - Remove from a team means:
    - Create an instance of Player from the current instance of Teammate.
    - Remove the Teammate from the team array and add the new Player to the player list.
  - Difference between a person and a player: a player can be added to a team.
	- Player should extend the person class, adding a few player properties, and methods to join each team and leave the league.
  - A blueTeammate or redTeammate is an extension of Player, but without the ability to join a team. The teammate can leave a team, though.
*/

// ####  CLASS DECLARATIONS  ####
class Person {
  constructor(id, name, gender, age, skillSet, placeBorn) {
    this.id = id;
    this.name = name;
    this.gender = gender;
    this.age = age;
    this.skillSet = skillSet;
    this.placeBorn = placeBorn;
  }
  makePlayer() {
    const personIndex = arrOfPeople.indexOf(this);
    if(personIndex != -1) {
      const player = new Player(this.id, this.name, this.gender, this.age, this.skillSet, this.placeBorn);
      listOfPlayers.push(player);
      arrOfPeople.splice(personIndex, 1);
    }
    showPeople();
    showPlayers();
  }
}

class Player extends Person {
  constructor(id, name, gender, age, skillSet, placeBorn){
    super(id, name, gender, age, skillSet, placeBorn);
    this.yearsExperience = Math.floor(this.age / 2) % 7 + 1;
    this.canThrow = Math.floor(Math.random() * 100) / 10 + this.yearsExperience / 2;
    if(this.canThrow > 10)
      this.canThrow = 10;
    this.canDodge = Math.floor(Math.random() * 100) / 10 + this.yearsExperience / 2;
    if(this.canDodge > 10)
      this.canDodge = 10;
  }
  joinBlueTeam() {
    const playerIndex = this.getPlayerIndex();
    blueTeam.push(new BlueTeammate(this.id, this.name, this.gender, this.age, this.skillSet, this.placeBorn, this.canThrow, this.canDodge, this.yearsExperience));
    listOfPlayers.splice(playerIndex, 1);
    showPlayers();
    showBlueTeam();
  }
  joinRedTeam() {
    const playerIndex = this.getPlayerIndex();
    redTeam.push(new RedTeammate(this.id, this.name, this.gender, this.age, this.skillSet, this.placeBorn, this.canThrow, this.canDodge, this.yearsExperience));
    listOfPlayers.splice(playerIndex, 1);
    showPlayers();
    showRedTeam();
  }
  leaveLeague() {
    const playerIndex = this.getPlayerIndex();
    arrOfPeople.push(new Person(this.id, this.name, this.gender, this.age, this.skillSet, this.placeBorn));
    listOfPlayers.splice(playerIndex, 1);
    showPeople();
    showPlayers();
  }
  getPlayerIndex() {
    return listOfPlayers.findIndex(player => player.id == this.id);
  }
}

class BlueTeammate extends Player {
  constructor(id, name, gender, age, skillSet, placeBorn, canThrow, canDodge, yearsExperience){
    super(id, name, gender, age, skillSet, placeBorn, canThrow, canDodge, yearsExperience);
    this.team = 'blue';
  }
  leaveTeam() {
    const playerIndex = this.getBluePlayerIndex();
    listOfPlayers.push(new Player(this.id, this.name, this.gender, this.age, this.skillSet, this.placeBorn));
    blueTeam.splice(playerIndex, 1);
    showPlayers();
    showBlueTeam();
  }
  getBluePlayerIndex() {
    return blueTeam.findIndex(player => player.id == this.id);
  }
}

class RedTeammate extends Player {
  constructor(id, name, gender, age, skillSet, placeBorn, canThrow, canDodge, yearsExperience){
    super(id, name, gender, age, skillSet, placeBorn, canThrow, canDodge, yearsExperience);
    this.team = 'red';
  }
  leaveTeam() {
    const playerIndex = this.getRedPlayerIndex();
    listOfPlayers.push(new Player(this.id, this.name, this.gender, this.age, this.skillSet, this.placeBorn));
    redTeam.splice(playerIndex, 1);
    showPlayers();
    showRedTeam();
  }
  getRedPlayerIndex() {
    return redTeam.findIndex(player => player.id == this.id);
  }
}

// ####  GLOBAL FUNCTIONS  ####
const showPeople = () => {
  if(arrOfPeople.length > -1) {
    const listElement = document.getElementById('people')
    listElement.innerHTML = '';
    arrOfPeople.map(person => {
      const li = document.createElement("li")
      const button = document.createElement("button")
      const pre = document.createElement("pre");
      pre.innerHTML = `${person.name}\nage: ${person.age}\nhobby: ${person.skillSet}`;
      button.innerHTML = "Make Player"
      button.addEventListener('click', () => person.makePlayer())
      li.appendChild(pre)
      // li.appendChild(document.createTextNode(person.name + " - age " + person.age + ' - ' + person.skillSet))
      li.appendChild(button)
      listElement.append(li)
    });
  }
}

const showPlayers = () => {
  if(listOfPlayers.length > -1) {
    const listElement = document.getElementById('players')
    listElement.innerHTML = '';
    listOfPlayers.map(player => {
      const li = document.createElement("li")
      const pre = document.createElement("pre");
      pre.innerHTML = `${player.name}\nexperience: ${player.yearsExperience} years\nthrow rating: ${player.canThrow}\ndodge rating: ${player.canDodge}\nborn: ${player.placeBorn}`;
      const blueButton = document.createElement("button")
      const redButton = document.createElement("button")
      const leaveButton = document.createElement("button")
      blueButton.innerHTML = "Join Blue"
      redButton.innerHTML = "Join Red"
      leaveButton.innerHTML = "Leave League"
      blueButton.addEventListener('click', () => player.joinBlueTeam())
      redButton.addEventListener('click', () => player.joinRedTeam())
      leaveButton.addEventListener('click', () => player.leaveLeague())
      li.appendChild(pre)
      li.appendChild(blueButton)
      li.appendChild(redButton)
      li.appendChild(leaveButton)
      listElement.append(li)
    })
  }
}

const showBlueTeam = () => {
  if(blueTeam.length > -1) {
    const listElement = document.getElementById('blue')
    listElement.innerHTML = '';
    blueTeam.map(player => {
      const li = document.createElement("li")
      const pre = document.createElement("pre");
      pre.innerHTML = `${player.name}\nage: ${player.age}\nborn: ${player.placeBorn}`;
      const button = document.createElement("button")
      button.innerHTML = "Leave Team"
      button.addEventListener('click', () => player.leaveTeam())
      li.appendChild(pre)
      li.appendChild(button)
      listElement.append(li)
    })
  }
}

const showRedTeam = () => {
  if(redTeam.length > -1) {
    const listElement = document.getElementById('red')
    listElement.innerHTML = '';
    redTeam.map(player => {
      const li = document.createElement("li")
      const pre = document.createElement("pre");
      pre.innerHTML = `${player.name}\nage: ${player.age}\nborn: ${player.placeBorn}`;
      const button = document.createElement("button")
      button.innerHTML = "Leave Team"
      button.addEventListener('click', () => player.leaveTeam())
      li.appendChild(pre)
      li.appendChild(button)
      listElement.append(li)
    })
  }
}

// #### START THE APP!  ####
window.onload = () => {
  arrOfPeople.forEach((person, index) => arrOfPeople[index] = new Person(person.id, person.name, person.gender, person.age, person.skillSet, person.placeBorn));
  showPeople();
}