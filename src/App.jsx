import { useEffect, useState } from 'react';
import './App.css';
// import Card from './components/Card';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [pokemon, setPokemon] = useState({});
  const [searchPokemon, setSearchPokemon] = useState('');

  function handleChange(e) {
    setSearchPokemon(e.target.value);
    console.log(e.target.value);
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const res = await fetch(
        'https://pokeapi.co/api/v2/pokemon/' + searchPokemon
      );
      // const res = await fetch('https://pokeapi.co/api/v2/pokemon/moltres');
      console.log(res);
      if (res.ok) {
        console.log('success');
        const data = await res.json();
        setPokemon({
          name: data.name,
          image: data.sprites.other.dream_world.front_default,
        });
        setIsLoading(false);
      }
    };
    fetchData();
  }, [searchPokemon]);

  return (
    <>
      <input type="text" onChange={handleChange} />
      <h1 className="text-3xl">hello world</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <p>{pokemon.name}</p>
          <img src={pokemon.image} alt="" />
        </>
      )}
    </>
  );
}

export default App;
