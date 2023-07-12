import React from 'react'

import "./GeneralButton.css";


export const CreateButton = ({ onClick }) => {
    return (
        <button className="general-button" onClick={onClick}>
            1. Create Game
        </button>
    );
}

export default CreateButton