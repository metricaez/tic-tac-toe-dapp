import React, { useState } from 'react';

import './App.css';
import { Board } from './components/Board'
import { Scoreboard } from './components/Scoreboard';
import { ResetButton } from './components/ResetButton';

function App() {

  const WIN_CONDITIONS = [
    [0, 1, 2], // top row
    [3, 4, 5], // middle row
    [6, 7, 8], // bottom row
    [0, 4, 8], // left diagonal
    [2, 4, 6], // right diagonal
    [0, 3, 6], // left column
    [1, 4, 7], // middle column
    [2, 5, 8] // right column
  ];

  const [board, setBoard] = useState(Array(9).fill(null));
  const [xPlaying, setXPlaying] = useState(true);
  const [scores, setScores] = useState({xScore: 0, oScore: 0});
  const [gameOver, setGameOver] = useState(false);

  const handleBoxClick = (boxIndex) => {
    
    const newBoard = board.map((value, idx) => {
      if (idx === boxIndex) {
        return xPlaying ? "X" : "O";
      }
      else {
        return value;
      }
    });
    const winner = checkWinner(newBoard);

    if (winner) {
      if (winner === "X") {
        setScores({xScore: scores.xScore + 1, oScore: scores.oScore});
      } else {  
        setScores({xScore: scores.xScore, oScore: scores.oScore + 1});
      }
    }
    setBoard(newBoard);
    setXPlaying(!xPlaying);
  }

const checkWinner = (board) => {
  for (let i = 0; i < WIN_CONDITIONS.length; i++) {
    const [a, b, c] = WIN_CONDITIONS[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      setGameOver(true);
      return board[a];
    }
  }
  return null;
}

const resetBoard = () => {
  setGameOver(false);
  setBoard(Array(9).fill(null));
}

  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>
      <Scoreboard scores={scores} xPlaying={xPlaying} />
      <Board board={board} onClick={gameOver ? resetBoard : handleBoxClick} />
      <ResetButton onClick={resetBoard} />
    </div>
  );
}
export default App;

