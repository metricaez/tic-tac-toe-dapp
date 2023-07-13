import React from 'react'

import "./GeneralButton.css";


export const HostEndButton = ({ onClick }) => {
    return (
        <button className="general-button" onClick={onClick}>
            3. Host End Game
        </button>
    );
}

export default HostEndButton