import React from 'react'

import "./GeneralButton.css";


export const JoinButton = ({ onClick }) => {
    return (
        <button className="general-button" onClick={onClick}>
            Join Game
        </button>
    );
}

export default JoinButton