import React from "react";

import "./ResetButton.css";

export const ResetButton = ({ onClick }) => {
    return (
        <button className="reset-button" onClick={onClick}>
            Reset
        </button>
    );
}