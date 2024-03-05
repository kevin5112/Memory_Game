import { useEffect, useState } from 'react';
import './App.css';
import Card from './components/Card';
import { getPokemon } from './components/GetPokemon';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    if (isLoading) {
      getPokemon(setPokemonList, setIsLoading);
      setIsLoading(false);
    }
  }, [isLoading]);

  function checkGameOver(e, selectedPokemon) {
    const pokemon = pokemonList.find((p) => p.name === selectedPokemon);

    if (pokemon.picked) {
      console.log('Game Over');
      // TODO: trigger game over scene.
    }
  }

  useEffect(() => {
    const shuffleList = pokemonList.sort(() => Math.random() - 0.5);
    setPokemonList(shuffleList);
  }, [pokemonList]);

  function handleClick(e) {
    e.preventDefault();
    const selectedPokemon = e.currentTarget.textContent;

    checkGameOver(e, selectedPokemon);

    setPokemonList((pokemonList) =>
      pokemonList.map((pokemon) => ({
        ...pokemon,
        picked: pokemon.picked ? true : pokemon.name === selectedPokemon,
      }))
    );
  }
  console.log('pokemonList:', pokemonList);

  return (
    <>
      <h1 className="text-3xl p-10">hello world</h1>
      <ul className="flex flex-row gap-20">
        {pokemonList.map((pokemon) => {
          return (
            <div key={pokemon.id} onClick={handleClick}>
              <Card pokemon={pokemon} />
            </div>
          );
        })}
      </ul>
    </>
  );
}

export default App;
