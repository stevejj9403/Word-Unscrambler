import React, { useState } from 'react';

//this is where the gameplay happens
const GuessInput = ({ wordLength, onSubmit }) => {
  const [guess, setGuess] = useState(Array(wordLength).fill(''));

  const handleInputChange = (e, index) => {
    const input = e.target.value;
    if (input.length <= 1) {
      const newGuess = [...guess];
      newGuess[index] = input;
      setGuess(newGuess);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(guess.join(''));
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* {Array.from({ length: wordLength }, (_, index) => (
        <input
          key={index}
          type="text"
          maxLength="1"
          value={guess[index] || ''}
          onChange={(e) => handleInputChange(e, index)}
          autoFocus={index === 0} // Auto-focus the first input
        />
      ))} */}
      <button type="submit">Submit</button>
    </form>
  );
};

export default GuessInput;
