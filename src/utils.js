const NUM_POKEMON = 1025;
const DECK_SIZE = 16;


function getRandomIDs(count) {
    let ids = [];
    while (ids.length < count) {
        let newId = Math.floor(Math.random() * NUM_POKEMON);
        if (!ids.includes(newId)) {
            ids.push(newId);
        }
    }
    return ids;
}

async function getPokemonData(ids) {
    try {
        const promises = ids.map(async (id) => {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
            const json = await response.json();
            return { src: json.sprites.front_default, id, name: json.name };
        });

        let pokemonData = await Promise.all(promises);
        return pokemonData;
    } catch (error) {
        console.error("Failed to fetch Pokemon:", error);
        throw error;
    }


}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

export { DECK_SIZE, getRandomIDs, NUM_POKEMON, getPokemonData, shuffleArray }