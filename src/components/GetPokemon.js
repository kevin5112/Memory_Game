export default async function GetPokemon() {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon/moltres');
  const json = await res.json();
  console.log('from getPokemon', json);
  return {
    id: json.id,
    name: json.name,
    url: json.sprites.other.dream_world.front_default,
  };
}
