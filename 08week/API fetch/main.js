"use strict"

class Pokemon {
  constructor(name, spriteBack, spriteFront, move1, move2, move3, move4, type1) {
    this.name = name;
    this.spriteBack = spriteBack;
    this.spriteFront = spriteFront;
    this.move1 = move1;
    this.move2 = move2;
    this.move3 = move3;
    this.move4 = move4;
    this.type1 = type1;
  }
  setTypeTwo(type) {
    this.type2 = type;
  }
}

const pokemonStage = [];

const getPokemon = (name) => {
  if(!name)
    name = Math.floor(Math.random() * 256) + 1;
  
  fetch('https://pokeapi.co/api/v2/pokemon/' + name)
  .then(res => {
    if(!res.ok) {
      throw Error(res.statusText)
    }
    return res.json()
  })
  .then(pokedexInfo => {
    const name = pokedexInfo.name;
    const back = pokedexInfo.sprites.back_default;
    const front = pokedexInfo.sprites.front_default;
    const move1 = pokedexInfo.moves[0].move.name;
    const move2 = pokedexInfo.moves[1].move.name;
    const move3 = pokedexInfo.moves[2].move.name;
    const move4 = pokedexInfo.moves[3].move.name;
    const type1 = pokedexInfo.types[0].type.name;

    let myPokemon = new Pokemon(name, back, front, move1, move2, move3, move4, type1);
    if(pokedexInfo.types.length > 1)
      myPokemon.setTypeTwo(pokedexInfo.types[1].type.name);

    pokemonStage.length = 0;
    pokemonStage.push(myPokemon);
    // console.log(pokemonStage);
    showPokemon();
  })
  .catch(err => console.log(`Error,  ${err}`));
}

const submitPokemonName = document.getElementById("find-pokemon");
submitPokemonName.onclick = () => {
  const textInput = document.querySelector('input');
  getPokemon(textInput.value);
  textInput.value = '';
}

const showPokemon = () => {
  const myPoke = pokemonStage[0];
  let result = `<h2>${myPoke.name}</h2>
                <img src="${myPoke.spriteFront}">
                <pre>Type: ${myPoke.type1}\nMoves: ${myPoke.move1}\n${myPoke.move2}\n${myPoke.move3}\n${myPoke.move4}</pre>`;
  let div = document.getElementById('show');
  div.innerHTML = result;
  document.body.appendChild(div);
}
// {  “moves”: [0: { “move”: { “name” } }, 1, 2, 3], “name”, “sprites”: { “back_default”, “front default” }, “types”: [0: { “type”: { “name” } }, 1]