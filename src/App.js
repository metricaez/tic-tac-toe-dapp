import React, { useState } from "react";

import "./App.css";
import { Board } from "./components/Board";
import { Scoreboard } from "./components/Scoreboard";
import { ResetButton } from "./components/ResetButton";
import { CreateButton } from "./components/CreateButton";
import { JoinButton } from "./components/JoinButton";
import { HostEndButton } from "./components/HostEndButton";
import { JoinEndButton } from "./components/JoinEndButton";
import { ApiPromise } from "@polkadot/api";
import { Keyring } from "@polkadot/keyring";
import { getGameId } from "./services/getGameId";

const WIN_CONDITIONS = [
  [0, 1, 2], // top row
  [3, 4, 5], // middle row
  [6, 7, 8], // bottom row
  [0, 4, 8], // left diagonal
  [2, 4, 6], // right diagonal
  [0, 3, 6], // left column
  [1, 4, 7], // middle column
  [2, 5, 8], // right column
];

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xPlaying, setXPlaying] = useState(true);
  const [scores, setScores] = useState({ xScore: 0, oScore: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [gameId, setGameId] = useState(0);
  const [winnerAccount, setWinnerAccount] = useState("");
  const [palletFunds, setPalletFunds] = useState(0);
  const [aliceBalance, setAliceBalance] = useState("");
  const [bobBalance, setBobBalance] = useState("");
  // Construct the keyring after the API (crypto has an async init)
  const keyring = new Keyring({ type: "sr25519" });

  // Add Alice to our keyring with a hard-derivation path (empty phrase, so uses dev)
  const alice = keyring.addFromUri("//Alice");
  const bob = keyring.addFromUri("//Bob");



  const handleCreateGame = async () => {
    setGameId(await getGameId());
    // Instantiate the API
    const api = await ApiPromise.create();

    // Create a extrinsic, transferring 12345 units to Bob
    const callable = api.tx.tictactoe.createGame(10000);

    // Sign and send the transaction using our account
    const hash = await callable.signAndSend(alice);

    console.log("Transfer sent with hash", hash.toHex());

  };

  const handleJoinGame = async () => {
    // must retrieve GameId from blockchain
    const api = await ApiPromise.create();
    console.log("GameId", gameId);
    const callable = api.tx.tictactoe.joinGame(gameId);
    const hash = await callable.signAndSend(bob);
    console.log("Transfer sent with hash", hash.toHex());
  };

  const handleHostEndGame = async () => {
    const api = await ApiPromise.create();

    const callableHost = api.tx.tictactoe.endGame(gameId, winnerAccount);
    const hashHost = await callableHost.signAndSend(alice);
    console.log("[end game alice] Transfer sent with hash", hashHost.toHex());
  };

  const handleJoinEndGame = async () => {
    const api = await ApiPromise.create();

    const callableJoiner = api.tx.tictactoe.endGame(gameId, winnerAccount);
    const hashJoiner = await callableJoiner.signAndSend(bob);
    console.log("[end game bob] Transfer sent with hash", hashJoiner.toHex());
  };

  const handleFundPallet = async () => {
    console.log("Funding pallet");
    const api = await ApiPromise.create();
    const callable = api.tx.balances.transfer("5EYCAe5ijiYfyBvGQG586C1JyTRNJWirijvTBhXKT3AT3nzs", 1000000);
    const hash = await callable.signAndSend(alice);
    console.log("[funding] Transfer sent with hash", hash.toHex());
  }

  const handleRefrechBalances = async () => {
    const api = await ApiPromise.create();
    const palletBalance = (await api.query.system.account("5EYCAe5ijiYfyBvGQG586C1JyTRNJWirijvTBhXKT3AT3nzs")).data.free.toHuman();
    setPalletFunds(palletBalance);
    console.log("Pallet balance", palletBalance);
    const aliceBalance = (await api.query.system.account("5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY")).data.free.toHuman();
    setAliceBalance(aliceBalance);
    const bobBalance = (await api.query.system.account("5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty")).data.free.toHuman();
    setBobBalance(bobBalance);
  }


  const handleBoxClick = (boxIndex) => {
    const newBoard = board.map((value, idx) => {
      if (idx === boxIndex) {
        return xPlaying ? "X" : "O";
      } else {
        return value;
      }
    });
    const winner = checkWinner(newBoard);

    if (winner) {
      if (winner === "X") {
        setScores({ xScore: scores.xScore + 1, oScore: scores.oScore });

        // Winner account is Alice
        const alice = "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY";
        setWinnerAccount(alice);
      } else {
        setScores({ xScore: scores.xScore, oScore: scores.oScore + 1 });

        // Winner account is Bob
        const bob = "5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty";
        setWinnerAccount(bob);
      }
    }
    setBoard(newBoard);
    setXPlaying(!xPlaying);
  };

  const checkWinner = (board) => {
    for (let i = 0; i < WIN_CONDITIONS.length; i++) {
      const [a, b, c] = WIN_CONDITIONS[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setGameOver(true);
        return board[a];
      }
    }
    return null;
  };

  const resetBoard = () => {
    setGameOver(false);
    setBoard(Array(9).fill(null));
  };

  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>
      <p> Pallet Funds: {palletFunds}</p>
      <span>
        <button className="clickable-text" onClick={handleFundPallet}>
          Fund Pallet
        </button>
        <button className="clickable-text" onClick={handleRefrechBalances}>
          Refresh Balances
        </button>
      </span>
      <Scoreboard scores={scores} xPlaying={xPlaying} />
      <Board board={board} onClick={gameOver ? resetBoard : handleBoxClick} />
      <p> Alice Balance: {aliceBalance}</p>
      <p> Bob Balance: {bobBalance}</p>
      <CreateButton onClick={handleCreateGame} />
      <JoinButton onClick={handleJoinGame} />
      <HostEndButton onClick={handleHostEndGame} />
      <JoinEndButton onClick={handleJoinEndGame} />
      <ResetButton onClick={resetBoard} />

    </div>
  );
}
export default App;

