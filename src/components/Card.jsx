export default function Card({ key, pokemon }) {
  // console.log('hi Im in card');
  console.log('pokemon name for card: ', pokemon.name);
  return (
    <div className="flex-1 bg-slate-300 px-5 pb-5 pt-2 rounded-xl hover:scale-110 duration-200 hover:cursor-pointer gap-5">
      <p className="text-slate-700 p-3">{pokemon.name}</p>
      <img
        src={pokemon.sprites.other.dream_world.front_default}
        alt=""
        className="w-32 h-32"
      />
    </div>
  );
}
