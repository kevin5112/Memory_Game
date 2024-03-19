export const getPokemon = async (setPokemonList, setIsLoading, idList) => {
  console.log('fetching pokemon list...');
  setIsLoading(true);

  const url = 'https://pokeapi.co/api/v2/pokemon/';

  const newResObj = [];

  await Promise.all(
    idList.map(async (id) => {
      newResObj.push(await fetch(url + id));
    })
  );

  if (newResObj[0].ok) {
    console.log('success');

    const dataObj = [];
    await Promise.all(
      newResObj.map(async (data) => {
        dataObj.push(await data.json());
      })
    );

    const pokeList = [];
    dataObj.forEach((data) => {
      console.log('apiData:', data);
      pokeList.push({
        id: data.id,
        name: data.name,
        image: data.sprites.other.dream_world.front_default,
        // image: data.sprites.front_default,
        picked: false,
      });
    });

    console.log('pokelist:', pokeList);
    setPokemonList(pokeList);
    setIsLoading(false);
  }
};
