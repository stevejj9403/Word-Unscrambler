import React, { useState } from 'react';
import './MakeBoard.css'

function MakeBoard(props) {
  const [numRows, setNumRows] = useState(props.props.rows);

  return (
    <div id="game-board">
      {Array.from({ length: numRows }, (_, rowIndex) => (
        <div key={rowIndex} className="letter-row">
          {Array.from({ length: props.props.length }, (_, colIndex) => (
            <div key={colIndex} className="letter-box"></div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default MakeBoard;
