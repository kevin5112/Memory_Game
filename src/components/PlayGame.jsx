import { useEffect, useState } from 'react';
import Card from './Card';
import { getPokemon } from './GetPokemon';

export default function PlayGame({ setGameover }) {
  const [isLoading, setIsLoading] = useState(true);
  const [pokemonList, setPokemonList] = useState([]);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(0);

  useEffect(() => {
    const pokemonSet = [
      [1, 4, 7, 10],
      [23, 65, 43, 56, 301, 69],
      [85, 493, 222, 304, 93, 49, 66, 102, 333],
    ];

    if (isLoading) {
      getPokemon(setPokemonList, setIsLoading, pokemonSet[level]);
      setIsLoading(false);
    }
  }, [pokemonList, isLoading, score, level]);

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

  function checkCompletedLevel() {
    if (filterPicked() === pokemonList.length) {
      console.log('set to next level');
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

  useEffect(() => {
    const newScore = pokemonList.filter((pokemon) => {
      return pokemon.picked === true;
    }).length;
    setScore(newScore);
  }, [pokemonList, score]);

  return (
    <>
      <h1 className="text-10xl text-slate-800 font-bold">Poke Match</h1>
      <h2 className="text-3xl pb-10 text-slate-800 pb-0 mb-0">
        Level: {level}
      </h2>
      <h2 className="text-3xl pb-10 text-slate-800">
        {score}/{pokemonList.length}
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
