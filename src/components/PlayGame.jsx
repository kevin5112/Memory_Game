import { library } from '@fortawesome/fontawesome-svg-core';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import Card from './Card';
import { getPokemon } from './GetPokemon';
library.add(faQuestion);

export default function PlayGame() {
  const [isLoading, setIsLoading] = useState(true);
  const [pokemonList, setPokemonList] = useState([]);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(0);
  const [maxLevel, setMaxLevel] = useState(0);
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    const pokemonSet = [
      [1, 4, 7, 10],
      [14, 17, 21, 25, 29, 33],
      [23, 65, 43, 56, 301, 69, 55, 98],
      [30, 34, 36, 87, 53, 77, 100, 2, 5, 8],
      [85, 493, 222, 304, 93, 49, 66, 102, 333, 234, 111, 566],
    ];
    setMaxLevel(pokemonSet.length);

    if (isLoading) {
      getPokemon(setPokemonList, setIsLoading, pokemonSet[level]);
      setIsLoading(false);
      setHighScore(GetHighScore());
    }
  }, [pokemonList, isLoading, score, level]);

  useEffect(() => {
    const shuffleList = pokemonList.sort(() => Math.random() - 0.5);
    setPokemonList(shuffleList);
  }, [pokemonList]);

  // console.log('pokemonList:', pokemonList);

  function checkGameOver(selectedPokemon) {
    const pokemon = pokemonList.find((p) => p.name === selectedPokemon);

    if (pokemon.picked) {
      alert('Game Over');
      ResetGame();
    } else {
      setScore(score + 1);
    }
  }

  function ResetGame() {
    setIsLoading(true);
    setLevel(0);
    setScore(0);
    ConfigureHighScore();
  }

  function GetHighScore() {
    const highScore = localStorage.getItem('highScore');
    return !highScore ? 0 : highScore;
  }

  function ConfigureHighScore() {
    const highScore = localStorage.getItem('highScore');
    if (highScore === null || highScore < score) {
      localStorage.setItem('highScore', score);
    }
  }

  function checkCompletedLevel(selectedPokemon) {
    if (filterPicked() === pokemonList.length - 1) {
      const pokemon = pokemonList.find((p) => p.name === selectedPokemon);
      if (!pokemon.picked) {
        console.log('set to next level');
        setIsLoading(true);
        setLevel(level + 1);
      }
    }
  }

  function filterPicked() {
    return pokemonList.filter((pokemon) => {
      return pokemon.picked === true;
    }).length;
  }

  function handleClick(e) {
    e.preventDefault();
    const selectedPokemon = e.currentTarget.textContent;

    checkGameOver(selectedPokemon);
    checkCompletedLevel(selectedPokemon);

    setPokemonList((pokemonList) =>
      pokemonList.map((pokemon) => ({
        ...pokemon,
        picked: pokemon.picked ? true : pokemon.name === selectedPokemon,
      }))
    );
  }

  return (
    <>
      <div className="peer absolute sm:top-8 sm:left-8 top-4 left-3 z-50 hover:scale-110 duration-300 hover:cursor-pointer">
        <FontAwesomeIcon
          className="md:h-8 md:w-8 h-4 w-4 bg-slate-500 rounded-full p-2"
          icon="fa-solid fa-question"
        />
      </div>
      <div className="absolute top-0 left-0 w-screen h-screen peer-hover:bg-black/80 bg-black/0 peer-hover:opacity-100 opacity-0 pointer-events-none cursor-default transition-all duration-300 bg-slate-800">
        <div className="box-border absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 break-normal bg-white text-black rounded-md p-10 opacity-100 z-50 outline outline-2 outline-yellow-300 outline-offset-[-5px]">
          <h3 className="sm:text-4xl font-bold pb-3 text-base">How to play?</h3>
          <p className="sm:text-2xl text-sm">
            In each level, the number of cards will increase by 2. You can only
            click on the same card once, and once you click it, the cards will
            randomly shuffle. Then, you will continue clicking the cards that
            you haven't picked before. Have fun!
          </p>
        </div>
      </div>

      <span className="font-tektur text-6xl text-red-600 font-medium">
        Poke
      </span>
      <span className="font-tektur text-6xl text-white font-medium">
        Memory
      </span>
      <div className="flex flex-row gap-5 justify-center pt-5 pb-16">
        <h2 className="font-tektur text-3xl text-slate-700 font-medium">
          Level: {level + 1}/{maxLevel}
        </h2>
        <hr className="w-0.5 h-10 bg-gray-900" />
        <h2 className="font-tektur text-3xl text-slate-700 font-medium">
          Score: {score}
        </h2>
        <hr className="w-0.5 h-10 bg-gray-900" />
        <h2 className="font-tektur text-3xl text-slate-700 font-medium">
          High Score: {highScore}
        </h2>
      </div>

      <ul className="flex flex-row flex-wrap gap-10 justify-center">
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
