# TicTacToe Frontend App

This is a simple React-App that implements Polkadot Js and is intended for managing game logic and demo the [TicTacToe Substrate Pallet](https://github.com/metricaez/tic-tac-toe-pallet)

## Description	

This app implements a board to play TicTacToe, a scoreboard that keep tracks of each player wins and multiple buttons to interact with the pallet that provides infrastructure to hold player bets while they play. 

## TicTacToe Pallet Overview

The TicTacToe pallet is designed for holding a certain amount of funds called “bet” and a safeguard deposit while two players play a TicTacToe match. At the end of the game both winners must declare who the winner is based on the game result, if there is a discrepancy, a judge is called to solve the conflict.  The winner of the match gets transferred both bets and if no mediation was required both players recover their safeguard deposit.
For further explanation refer to pallet documentation. 

## Design Decision 
- This app is intended to work as a demo for the scenario in which both players agree on who the winner is.
- It is intended to manage one game instance.
- It is intended for development environment.
- Even though pallet can manage a non fixed AccountId to create game instance and join games, this app has hardcoded Alice as game creator and Bob as joiner.
- A “Refresh Balances” has been implement that query and updates both players and pallet Currency free balances.
- It is expected the pallet to be run on dev mode on a local node, therefore the app listens to WSPort: `9944` which is the most commonly use for this purpose.
- Be aware that ending a game and withdrawing the players held funds will fail if the pallet is not left with enough funds for it’s existential deposit so an initial funding is recommended.
- Currently one call is executed per block, one easy way to check that the block has been confirmed is by refreshing the balances and see the value reflected. The other simple way is to check events with the [PolkadotJs explorer](https://polkadot.js.org/apps/#/explorer) while connected to your local node.
- For further pallet testing, state and storage monitoring PolkadotJS App and explorer is suggested. 

##How to Test (Play)

1. One Time Only: Run an instance of the local node found in: https://github.com/metricaez/tic-tac-toe-pallet
2. One Time Only: Fund the pallet with “ Fund pallet” button.
3. Create a game as Alice with “Create Game” button and wait block to confirm.
4. Join a game as Bob with “Join Game” button and wait block to confirm.
5. Play the game by clicking the boxes on the board.
6. When a player wins, propose the winner as Alice by clicking “Host End Game” and wait block to confirm.
7. Propose a winner as Bob by clicking “Joiner End Game” and wait block to confirm. At this points funds will be transferred to the respective winner.
8. Reset the board and repeat the process from point 3.

## Setup

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Run `npm install` to install dependencies 
Run `npm start` to run the app in development mode and launch a local instance on http://localhost:3000