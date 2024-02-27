export default function Card({ key, pokemon }) {
  // console.log('hi Im in card');
  console.log('pokemon name for card: ', pokemon.name);
  return (
    <div>
      <p>{pokemon.name}</p>
      <img src={pokemon.sprites.other.dream_world.front_default} alt="" />
    </div>
  );
}
