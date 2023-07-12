import React from 'react'

import "./GeneralButton.css";


export const EndButton = ({ onClick }) => {
    return (
        <button className="general-button" onClick={onClick}>
            End Game
        </button>
    );
}

export default EndButton