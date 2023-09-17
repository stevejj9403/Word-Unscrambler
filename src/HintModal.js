import './Modal.css'

import React from "react";

const HintModal = ({ isOpen, onClose, hint, ansBool, ans}) => {
    if (!isOpen) return null;

    return (
        <div className="hint-modal">
            <div className="modal-content">
                <div>
                    <span className="close" onClick={onClose}>
                        &times;
                    </span>
                    {ansBool ? (
                        <p>{ans}</p>
                    ) : (
                        <p><b>Definition: </b>{hint}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HintModal;
