import React from 'react'

import "./GeneralButton.css";


export const JoinEndButton = ({ onClick }) => {
    return (
        <button className="general-button" onClick={onClick}>
            4. Joiner End Game
        </button>
    );
}

export default JoinEndButton