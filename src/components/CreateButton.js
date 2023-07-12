import React from 'react'

import "./GeneralButton.css";


export const CreateButton = ({ onClick }) => {
    return (
        <button className="general-button" onClick={onClick}>
            Create Game
        </button>
    );
}

export default CreateButton