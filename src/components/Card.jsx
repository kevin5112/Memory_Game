import { useEffect, useState } from 'react';
import GetPokemon from './GetPokemon';

export default async function Card() {
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    (async () => {
      const poke = await GetPokemon();

      setPokemon(poke);
    })();
  }, []);

  console.log(pokemon);

  return (
    <div>
      <img src="" alt="" />
      <p>Description</p>
    </div>
  );
}
