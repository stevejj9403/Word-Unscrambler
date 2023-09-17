import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import MakeBoard from './MakeBoard';
import Modal from './Modal'
import HintModal from './HintModal';

function App() {
  const [scrambledWord, setScrambledWord] = useState([]);
  const currentWordRef = useRef('');
  const guessRef = useRef('');
  const [result, setResult] = useState('');
  const currentLetterRef = useRef(0);
  const plays = useRef(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHintModalOpen, setIsHintModalOpen] = useState(false);
  const definitionRef = useRef('');
  const [ansRequest, setAnswerRequest] = useState(false);


  //retrieves word by making a call to the api
  const getWord = () => {
      //gets word from custom 
      fetch('http://localhost:3000/scramble')
        .then(res => {
          return res.json();
        })
        .then(data => {
          currentWordRef.current = data.word.toLowerCase();
          setScrambledWord(data.scrambled.toLowerCase());

          console.log(data.scrambled);
          console.log(data.word);

          //api call to get the definition of the word
          let apicall = "https://api.dictionaryapi.dev/api/v2/entries/en/" + currentWordRef.current;
          fetch(apicall)
            .then(res => {
              return res.json();
            })
            .then(data => {
              definitionRef.current = data[0]?.meanings[0]?.definitions[0]?.definition
            })
            .catch((error) => 
              console.error('Error fetching data', error));
        })
        .catch((error) => console.error('Error fetching data:', error));
  }

  const handleGuessSubmit = (submittedGuess) => {
    plays.current +=1;
    // Compare the submitted guess to the current word
    if (submittedGuess === currentWordRef.current) {
      setResult('Correct!');
      let ref = document.getElementsByClassName("letter-row")[0];
      ref = ref.children;
      for(let i = 0; i < ref.length; ++i) {
        ref[i].style.borderBox = "box-border";
        ref[i].style.backgroundColor = "green";
      }
      
    } else {
      setResult('Incorrect. Try again.');
      let ref = document.getElementsByClassName("letter-row")[0].children;
      for(let i = 0; i < ref.length; ++i) {
        ref[i].style.borderBox = "box-border";
        ref[i].style.backgroundColor = "red";
      }
    }

    openModal();
  };

  //resets the board and generates a new word
  const handleNextWord = () => {
    plays.current = 0;
    resetResult();
    getWord();
    let ref = document.getElementsByClassName("letter-row")[0];
    // ref.style.backgroundColor = "white";
    let child = ref.children;
    for(var i = 0; i < child.length; i++) {
      child[i].textContent = "";
      child[i].style.borderBox = "box-border";
      child[i].style.backgroundColor = "white";
    }

    guessRef.current = "";
    currentLetterRef.current = 0;
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

    if (pressedKey === "Enter" && currentLetterRef.current === currentWordRef.current.length) {
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
    }
  }

  const checkGuess = (row) => {
    handleGuessSubmit(guessRef.current);
  }

  const resetBoard = () => {
    currentLetterRef.current = 0;
    guessRef.current = "";
    
    let child = document.getElementsByClassName("letter-row")[0].children;
    for(let i = 0; i<child.length; ++i) {
      child[i].textContent = "";
      child[i].style.borderBox = "box-border";
      child[i].style.backgroundColor = "white";
    }
  }

  const deleteLetter = (row) => {
    currentLetterRef.current -= 1;
    let box = row.children[currentLetterRef.current];
    guessRef.current = guessRef.current.substring(0,guessRef.current.length-1);

    box.textContent = "";
  }

  const resetResult = () => {
    setResult("");
  }

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const openHintModal = () => {
    setIsHintModalOpen(true);
  }

  const closeHintModal = () => {
    setIsHintModalOpen(false);
    setAnswerRequest(false);
  }

  const getAnswer = () => {
    setAnswerRequest(true);
    openHintModal();
  }

  return (
    <div className="App">
      <h1>Ekreb</h1>
      <p id="score">Score: {plays.current}</p>
      
      <p>Unscramble and type in the word below then press Enter!</p>
      <h2 id = "scrambled"><b>{scrambledWord}</b></h2>  
      <div id="board"></div>
      <MakeBoard props={{length: currentWordRef.current.length, rows: 1}}/>

      {useEffect(() => {
        getWord();
        document.addEventListener('keyup', handleKeyPress);
        return () => {
          document.removeEventListener('keyup', handleKeyPress);
        };
      }, [])}

      <div>
        <button onClick = {()=> {handleNextWord(); resetBoard();}} id = "giveup">Give up</button>
        <button onClick ={openHintModal} id = "hint">Hint</button>
        <button onClick ={getAnswer} id = "answer">See Answer</button>
      </div>

      <HintModal isOpen = {isHintModalOpen} onClose ={closeHintModal} hint = {definitionRef.current} ansBool={ansRequest} ans={currentWordRef.current}/>
      
      <Modal isOpen= {isModalOpen} onClose={closeModal} result = {result} score = {plays.current} nextWord = {handleNextWord} reset = {resetBoard}/>
    </div>
  );
}

export default App;
