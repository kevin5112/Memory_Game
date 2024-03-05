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
      pokeList.push({
        id: data.id,
        name: data.name,
        image: data.sprites.other.dream_world.front_default,
        picked: false,
      });
    });

    console.log('pokelist:', pokeList);

    // set
    setPokemonList(pokeList);
    setIsLoading(false);
  }

  // const resObj = [];
  // const temp = await fetch('https://pokeapi.co/api/v2/pokemon/1');
  // const temp2 = await fetch('https://pokeapi.co/api/v2/pokemon/4');
  // const temp3 = await fetch('https://pokeapi.co/api/v2/pokemon/7');
  // const temp4 = await fetch('https://pokeapi.co/api/v2/pokemon/10');

  // if (temp.ok) {
  //   console.log('success');

  //   resObj.push(await temp.json());
  //   resObj.push(await temp2.json());
  //   resObj.push(await temp3.json());
  //   resObj.push(await temp4.json());

  //   // console.log('resObj: ', resObj);

  //   const pokeList = [];
  //   resObj.forEach((data) => {
  //     pokeList.push({
  //       id: data.id,
  //       name: data.name,
  //       image: data.sprites.other.dream_world.front_default,
  //       picked: false,
  //     });
  //   });
  //   // console.log('pokelist: ', pokeList);

  //   // setPokemon({
  //   //   name: data.name,
  //   //   image: data.sprites.other.dream_world.front_default,
  //   // });
  //   setPokemonList(pokeList);
  //   setIsLoading(false);
  // }
};
