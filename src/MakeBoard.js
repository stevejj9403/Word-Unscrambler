import React, { useState } from 'react';
import './MakeBoard.css'

function MakeBoard(props) {
  const [numRows, setNumRows] = useState(props.props.rows);

  const addRow = () => {
    setNumRows(numRows + 1);
    console.log(numRows);
  };

// let box = document.createElement("div");
// box.className = "letter-row"
// for(let i = 0; i<props.wordLength; i++) {
//     let boxChild = document.createElement("div");
//     box.appendChild(boxChild);
// }

  return (
    <div id="game-board">
      {Array.from({ length: numRows }, (_, rowIndex) => (
        <div key={rowIndex} className="letter-row">
          {Array.from({ length: props.props.length }, (_, colIndex) => (
            <div key={colIndex} className="letter-box"></div>
          ))}
        </div>
      ))}
      <button onClick={addRow}>Add Row</button>
    </div>
  );
}

export default MakeBoard;
