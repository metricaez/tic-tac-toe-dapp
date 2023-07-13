import React from "react";

import "./Scoreboard.css";

export const Scoreboard = ({ scores, xPlaying }) => {
    const { xScore, oScore } = scores;
    return (
        <div className="scoreboard">
            <span className={`score x-score ${!xPlaying && "inactive"}`} > Alice: <br></br> X - {xScore}</span>
            <span className={`score o-score ${xPlaying && "inactive"}` }> Bob: <br></br> O - { oScore }</span>
        </div >
    );
    }