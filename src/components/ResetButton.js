import React from "react";

import "./GeneralButton.css";

export const ResetButton = ({ onClick }) => {
    return (
        <button className="general-button" onClick={onClick}>
            5. Reset Board
        </button>
    );
}