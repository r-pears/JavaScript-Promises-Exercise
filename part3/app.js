let url = `https://pokeapi.co/api/v2`;

// Solution 1.
axios.get(`${url}/pokemon/?limit=2000`)
  .then(resp => {
    console.log(resp)
  })

// Solution 2.
axios.get(`${url}/pokemon/?limit=2000`)
  .then(resp => {
    let randomPokemonArray = [];

    for (let i = 0; i < 3; i++) {
      let randomIndex = Math.floor(Math.random() * resp.data.results.length);
      let url = resp.data.results.splice(randomIndex, 1)[0].url;
      randomPokemonArray.push(url);
    }
    return Promise.all(randomPokemonArray.map(url => axios.get(url)));
  })
  .then(response => {
    response.forEach(pokemon => console.log(pokemon));
  })

// Solution 3.
let names = null;

axios.get(`${url}/pokemon/?limit=2000`)
  .then(resp => {
    let randomArray = [];
    for (let i = 0; i < 3; i++) {
      let randomIndex = Math.floor(Math.random() * resp.data.results.length);
      let url = resp.data.results.splice(randomIndex, 1)[0].url;
      randomArray.push(url);
    }
    return Promise.all(randomArray.map(url => axios.get(url)));
  })
  .then(resp => {
    names = resp.map(pokemon => pokemon.data.name);
    return Promise.all(resp.map(pokemon => axios.get(pokemon.data.species.url)));
  })
  .then(resp => {
    let descriptions = resp.map(pokemon => {
      let descObject = pokemon.data.flavor_text_entries.find(
        dataEntry => dataEntry.language.name === 'en'
      );
      return descObject ? descObject.flavor_text : 'This pokémon does not have a description.';
    });
    descriptions.forEach((desc, index) => {
      console.log(`${names[index]}: ${desc}`);
    });
  });

// Solution 4.
let pokemonSection = document.querySelector('#pokemon-section');

function getPokemons() {
  let pokemonData = [];
  pokemonSection.innerHTML = '';

  axios.get(`${url}/pokemon/?limit=2000`)
    .then(resp => {
      let randomPokemons = [];
      for (let i = 0; i < 3; i++) {
        let randomIndex = Math.floor(Math.random() * resp.data.results.length);
        let url = resp.data.results.splice(randomIndex, 1)[0].url;
        randomPokemons.push(url);
      }
      return Promise.all(randomPokemons.map(url => axios.get(url)));
    })
    .then(resp => {
      pokemonData = resp.map(pokemon => ({
        name: pokemon.data.name,
        img: pokemon.data.sprites.front_default
      }));
      return Promise.all(resp.map(pokemon => axios.get(pokemon.data.species.url)));
    })
    .then(resp => {
      resp.forEach((pokemon, index) => {
        let descObj = pokemon.data.flavor_text_entries.find(function (entry) {
          return entry.language.name === 'en';
        });
        let description = descObj ? descObj.flavor_text : 'This pokémon does not have a description.';
        let { name, img } = pokemonData[index];

        let newCard = document.createElement('div');
        newCard.classList.add('pokemon-card');
        newCard.innerHTML = `
          <h1>${name}</h1>
          <img src=${img} />
          <p>${description}</p>
        `
        pokemonSection.append(newCard)
      })
  })
}