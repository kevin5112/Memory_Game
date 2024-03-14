import { useEffect, useState } from 'react';
import Card from './Card';
import { getPokemon } from './GetPokemon';

export default function PlayGame({ setGameover }) {
  const [isLoading, setIsLoading] = useState(true);
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    if (isLoading) {
      getPokemon(setPokemonList, setIsLoading);
      setIsLoading(false);
    }
  }, [isLoading]);

  useEffect(() => {
    const shuffleList = pokemonList.sort(() => Math.random() - 0.5);
    setPokemonList(shuffleList);
  }, [pokemonList]);

  // console.log('pokemonList:', pokemonList);

  function checkGameOver(e, selectedPokemon) {
    const pokemon = pokemonList.find((p) => p.name === selectedPokemon);

    if (pokemon.picked) {
      console.log('Game Over');
      setIsLoading(true);
    }
  }

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

  return (
    <>
      <h1 className="text-3xl">Poke Match</h1>
      <h2 className="text-xl pb-10">
        {
          pokemonList.filter((pokemon) => {
            return pokemon.picked === true;
          }).length
        }
        /{pokemonList.length}
      </h2>

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
