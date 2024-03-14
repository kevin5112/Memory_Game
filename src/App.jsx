import { useState } from 'react';
import './App.css';
import Gameover from './components/Gameover';
import PlayGame from './components/PlayGame';

function App() {
  const [gameover, setGameover] = useState(false);

  return (
    <>
      {gameover ? (
        <Gameover setGameover={setGameover} />
      ) : (
        <PlayGame setGameover={setGameover} />
      )}
    </>
  );
}

export default App;
