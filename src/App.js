import React, { useState } from 'react';


import './App.css';
import { Board } from './components/Board'
import { Scoreboard } from './components/Scoreboard';
import { ResetButton } from './components/ResetButton';
import { CreateButton } from './components/CreateButton';
import { JoinButton } from './components/JoinButton';
import EndButton from './components/EndButton';

function App() {

  const { ApiPromise } = require("@polkadot/api");
  const { Keyring } = require("@polkadot/keyring");

  // Construct the keyring after the API (crypto has an async init)
  const keyring = new Keyring({ type: "sr25519" });

  // Add Alice to our keyring with a hard-derivation path (empty phrase, so uses dev)
  const alice = keyring.addFromUri("//Alice");
  const bob = keyring.addFromUri("//Bob");
  const winner_account = keyring.addFromUri("//Alice");

  const handleCreateGame = async () => {
    // Instantiate the API
    const api = await ApiPromise.create();

    // Create a extrinsic, transferring 12345 units to Bob
    const callable = api.tx.tictactoe.createGame(10000);

    // Sign and send the transaction using our account
    const hash = await callable.signAndSend(alice);

    console.log("Transfer sent with hash", hash.toHex());
    
    // Ideally can create if game is running
    // Ideally diplay error in a better way
  }

  const handleJoinGame = async () => {
    // must retrieve GameId from blockchain
    const api = await ApiPromise.create();
    const callable = api.tx.tictactoe.joinGame(0);
    const hash = await callable.signAndSend(bob);
    console.log("Transfer sent with hash", hash.toHex());
  }

  const handleEndGame = async () => {
    const api = await ApiPromise.create();
    const callable = api.tx.tictactoe.endGame(0, "5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty");
    // must do second callable to end game, add winner account as parameter
    const hash = await callable.signAndSend(alice);
    console.log("Transfer sent with hash", hash.toHex());
  }

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
  const [scores, setScores] = useState({ xScore: 0, oScore: 0 });
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
        setScores({ xScore: scores.xScore + 1, oScore: scores.oScore });
        // Winner account is Alice
      } else {
        setScores({ xScore: scores.xScore, oScore: scores.oScore + 1 });
        // Winner account is Bob
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
      <CreateButton onClick={handleCreateGame} />
      <JoinButton onClick={handleJoinGame} />
      <EndButton onClick={handleEndGame} />
    </div>
  );
}
export default App;

