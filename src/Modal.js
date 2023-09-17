import './Modal.css'

import React from "react";

const Modal = ({ isOpen, onClose, result, score, nextWord, reset}) => {
    if (!isOpen) return null;
    console.log(result);

    return (
        <div className="modal">
            <div className="modal-content">
                <div>
                    {/* ternary operation for modal dependent on result */}
                    {result === "Correct!" ? (
                        <div>
                            <h1 id="correct">Correct!</h1>
                            <h2>Score: {score}</h2>
                            <button onClick={() => {nextWord(); onClose();}}>Next Word</button>
                        </div>
                        ) : (
                        <div>
                            <h1 id="wrong">Wrong</h1>
                            <button onClick={()=> {nextWord(); onClose();}}>New Word?</button>
                            <button onClick={() => {reset(); onClose();}}>Try Again</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Modal;
