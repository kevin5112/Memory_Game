import { useEffect, useState } from 'react';
import './App.css';
import Card from './components/Card';
import { getPokemon } from './components/GetPokemon';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [pokemonList, setPokemonList] = useState([]);
  // const [searchPokemon, setSearchPokemon] = useState('');

  useEffect(() => {
    getPokemon(setPokemonList, setIsLoading);
  }, []);

  return (
    <>
      <h1 className="text-3xl p-10">hello world</h1>
      <ul className="flex flex-row gap-20">
        {pokemonList.map((pokemon) => {
          return <Card key={pokemon.id} pokemon={pokemon} />;
        })}
      </ul>
    </>
  );
}

export default App;
