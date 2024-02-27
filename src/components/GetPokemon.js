export const getPokemon = async (setPokemonList, setIsLoading) => {
  setIsLoading(true);
  // const res = await fetch(
  //   'https://pokeapi.co/api/v2/pokemon/' + searchPokemon
  // );
  // const res = await fetch('https://pokeapi.co/api/v2/pokemon/moltres');

  const resObj = [];
  const temp = await fetch('https://pokeapi.co/api/v2/pokemon/1');
  const temp2 = await fetch('https://pokeapi.co/api/v2/pokemon/4');
  const temp3 = await fetch('https://pokeapi.co/api/v2/pokemon/7');

  if (temp.ok) {
    console.log('success');

    resObj.push(await temp.json());
    resObj.push(await temp2.json());
    resObj.push(await temp3.json());
    // const data = await res.json();
    // setPokemon({
    //   name: data.name,
    //   image: data.sprites.other.dream_world.front_default,
    // });
    setPokemonList(resObj);
    setIsLoading(false);
  }
};
