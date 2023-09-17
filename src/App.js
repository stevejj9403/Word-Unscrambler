import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import MakeBoard from './MakeBoard';

function App() {
  const [scrambledWord, setScrambledWord] = useState([]);
  const currentWordRef = useRef('');
  const guessRef = useRef('');
  const [result, setResult] = useState('');
  const currentLetterRef = useRef(0);
  const plays = useRef(0);

  //retrieves word by making a call to the api
  const getWord = () => {
    fetch('http://localhost:3000/scramble')
      .then(res => {
        return res.json();
      })
      .then(data => {
        currentWordRef.current = data.word.toLowerCase();
        setScrambledWord(data.scrambled.toLowerCase());

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
    if (submittedGuess === currentWordRef.current) {
      setResult('Correct!');
      let ref = document.getElementsByClassName("letter-row")[0];
      ref.style.backgroundColor = "green";

    } else {
      setResult('Incorrect. Try again.');
      let ref = document.getElementsByClassName("letter-row")[0];
      ref.style.backgroundColor = "red";
    }
  };

  //resets the board and generates a new word
  const handleNextWord = () => {
    resetResult();
    getWord();
    let ref = document.getElementsByClassName("letter-row")[0];
    ref.style.backgroundColor = "white";
    let child = ref.children;
    for(var i = 0; i < child.length; i++) {
      child[i].textContent = "";
    }

    guessRef.current = "";
    currentLetterRef.current = 0;
    plays.current += 1;
  };

  const handleKeyPress = (e) => {
    resetResult();
    let pressedKey = String(e.key);

    const row = document.getElementsByClassName("letter-row")[0];
    
    let box = row.children[currentLetterRef.current];
    
    if (pressedKey === "Backspace" && currentLetterRef.current !== 0) {
        deleteLetter(row)
        return;
    }

    if (pressedKey === "Enter") {
        checkGuess(row)
        return;
    }

    if(currentLetterRef.current >= row.children.length) {
      return;
    }

    let found = pressedKey.match(/[a-z]/gi)
    if(!found || found.length>1)
      return;
    else {
      box.textContent = pressedKey;
      currentLetterRef.current+=1;
      guessRef.current += pressedKey;
      console.log(guessRef.current);
      console.log(currentLetterRef.current);
    }
  }

  const checkGuess = (row) => {
    handleGuessSubmit(guessRef.current);
  }

  const deleteLetter = (row) => {
    currentLetterRef.current -= 1;
    let box = row.children[currentLetterRef.current];
    guessRef.current = guessRef.current.substring(0,guessRef.current.length-1);
    console.log(guessRef.current);

    box.textContent = "";
  }

  const resetResult = () => {
    setResult("");
  }

  return (
    <div className="App">
      <h1>Ekreb</h1>
      <p>Scrambled Word: {scrambledWord}</p>  
      <div id="board"></div>
      <MakeBoard props={{length: currentWordRef.current.length, rows: 1}}/>
      
      <p>{result}</p>
      <button onClick={handleNextWord}>Next Word</button>
      {useEffect(() => {
        document.addEventListener('keyup', handleKeyPress);
        return () => {
          document.removeEventListener('keyup', handleKeyPress);
        };
      }, [])}
    </div>
  );
}

export default App;
