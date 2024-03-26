export default function Card({ pokemon }) {
  // console.log('Creating card for: ', pokemon.name);
  return (
    <div className="flex-1 bg-slate-100 px-5 pb-5 pt-2 rounded-xl hover:scale-110 duration-300 hover:cursor-pointer hover:outline-offset-0 gap-5 box-border outline outline-2 outline-red-600 outline-offset-[-5px] flex flex-col items-center w-40">
      <p className="text-slate-700 pt-3">{pokemon.name}</p>
      <img
        src={pokemon.image}
        alt=""
        className="object-contain h-16 w-16 sm:h-32 sm:w-32"
      />
    </div>
  );
}
