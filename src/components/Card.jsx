export default function Card({ pokemon }) {
  // console.log('Creating card for: ', pokemon.name);
  return (
    <div
      className="flex-1 bg-slate-300 px-5 pb-5 pt-2 rounded-xl hover:scale-110 duration-200 hover:cursor-pointer gap-5 box-border"
      // onClick={handleClick}
    >
      <p className="text-slate-700 p-3">{pokemon.name}</p>
      <img src={pokemon.image} alt="" className="w-32 h-32" />
    </div>
  );
}
