import './App.css';
import React, { useState, useEffect } from 'react';
import GuessInput from './GuessInput';
import MakeBoard from './MakeBoard';

function App() {
  const [scrambledWord, setScrambledWord] = useState([]);
  const [currentWord, setCurrentWord] = useState('');
  const [guess, setGuess] = useState('');
  const [result, setResult] = useState('');

  //retrieves word by making a call to the api
  const getWord = () => {
    fetch('http://localhost:3000/scramble')
      .then(res => {
        return res.json();
      })
      .then(data => {
        setCurrentWord(data.word);
        setScrambledWord(data.scrambled);

        console.log(data.scrambled);
        console.log(data.word);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }

  //initializes the first guess
  useEffect(() => {
    getWord();
  }, []);

  const handleGuessSubmit = (submittedGuess) => {
    // Compare the submitted guess to the current word
    if (submittedGuess === currentWord) {
      setResult('Correct!');
    } else {
      setResult('Incorrect. Try again.');
    }
  };

  const handleNextWord = () => {
    getWord();

  };

  return (
    <div className="App">
      <h1>Ekreb</h1>
      <p>Scrambled Word: {scrambledWord}</p>
      <GuessInput wordLength={currentWord.length} onSubmit={handleGuessSubmit} />
      
      <div id="board"></div>
      <MakeBoard props={{length: currentWord.length, rows: 1}}/>
      
      <p>{result}</p>
      <button onClick={handleNextWord}>Next Word</button>
    </div>
  );
}

export default App;
