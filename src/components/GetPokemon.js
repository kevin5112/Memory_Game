export const getPokemon = async (setPokemonList, setIsLoading) => {
  console.log('fetching pokemon list...');
  setIsLoading(true);

  const url = 'https://pokeapi.co/api/v2/pokemon/';

  const newResObj = [];
  const idList1 = [1, 4, 7, 10];
  const idList2 = [23, 65, 43, 5, 301, 69];

  await Promise.all(
    idList2.map(async (id) => {
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
