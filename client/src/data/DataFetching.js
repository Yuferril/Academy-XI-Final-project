export const handleFetchPokemon = ({ handleResponse }) => {
  var pokeDb = [];
  var pokeDataMerge = [];

  fetch("/pokemons")
    .then((response) => response.json())
    .then((data) => {
      pokeDb = data;
    })
    .then(() => {
      fetch(`https://pokeapi.co/api/v2/pokemon?limit=151`)
        .then((response) => response.json())
        .then((data) => {
          const fetchPromises = data.results.map((pokemon, index) =>
            fetch(pokemon.url)
              .then((response) => response.json())
              .then((pokemonDetails) => ({
                id: index + 1,
                name: pokemonDetails.name,
                sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                  index + 1
                }.png`,
                element_type: pokemonDetails.types.map(
                  (type) => type.type.name
                ),
                weight: pokemonDetails.weight / 10 + " kg",
                height: pokemonDetails.height * 10 + " cm",
              }))
          );

          Promise.all(fetchPromises).then((pokemonDetails) => {
            for (const pokeDataApi of pokemonDetails) {
              for (const pokeDataDb of pokeDb) {
                const dbName = pokeDataDb.name.toLowerCase();
                const apiName = pokeDataApi.name.toLowerCase();
                if (apiName === dbName) {
                  var mergePokeData = {
                    ...pokeDataDb,
                    ...pokeDataApi,
                  };
                  mergePokeData = {
                    ...mergePokeData,
                    element_type: mergePokeData.element_type.join(" "),
                    id: pokeDataDb.id,
                  };

                  pokeDataMerge.push(mergePokeData);
                }
              }
            }
            console.log("pokeDataMerge", pokeDataMerge);
            handleResponse(pokeDataMerge);
          });
        });
    });
};
