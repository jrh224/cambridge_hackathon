import React, { useEffect, useState } from "react";
import "./SnakesAndLadders.css";

export default function SnakesAndLadders() {
  var newGameState = Array(100).fill(null);
  newGameState[0] = "AB";
  const [gameState, setGameState] = useState(newGameState);

  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [winner, setWinner] = useState(null);

  const [player0, setPlayer0] = useState(0);
  const [player1, setPlayer1] = useState(0);

  const [snakes, setSnakes] = useState([]);
  const [ladders, setLadders] = useState([]);

  const [diceValue, setDiceValue] = useState(0);
  const [turnInProgress, setTurnInProgress] = useState(false);



  // Computer to display
  function compToDis(pos) {
    const level = Math.floor(pos/10)
    const mod_pos = level % 2 == 1 ? pos+1 : level*10 + (10 - pos%10)
    return mod_pos - (level-4.5)*20
  }

  // Display to computer
  function disToComp(pos) {
    const level = Math.floor(pos/10)
    const mod_pos = level % 2 == 0 ? pos+1 : level*10 + (10 - pos%10)
    return mod_pos - (level-4.5)*20 - 1
  }
  
  function initPlayer() {
    setPlayer0(0);
    setPlayer1(0);
  }

  function initSnakes() {
    var numSnakes = Math.floor(Math.random()*(10-5)+5);
    var arrSnake = new Array(100).fill(null);
    var path = [0,0];
    for (var i = 0; i < numSnakes; i++) {
      path[0] = Math.floor(Math.random()*(90-1)+1);
      do {
        path[1] = Math.floor(Math.random()*(90-1)+1);
      } while (path[1] <= (Math.floor(path[0]/10) + 1) * 10);
      arrSnake[path[0]] = path[1];
    }
    setSnakes(arrSnake);
  }

  function initLadders() {
    var numLadders = Math.floor(Math.random()*(10-5)+5);
    var arrLadder = new Array(100).fill(null);
    var path = [0,0];
    for (var i = 0; i < numLadders; i++) {
      path[0] = Math.floor(Math.random()*(90-1)+1);
      do {
        path[1] = Math.floor(Math.random()*(90-1)+1);
      } while (path[1] <= (Math.floor(path[0]/10) + 1) * 10);
      arrLadder[path[0]] = path[1];
    }
    setLadders(arrLadder);
  }

  function rollDice() {
    if (!turnInProgress) {
      var result = Math.floor(Math.random() * 6 + 1);
      setDiceValue(result);
      setTurnInProgress(true);
      console.log(player0)
    }
  }

  function useDiceRoll() {
    if (turnInProgress) {
      if (currentPlayer == 0) {
        const potentialNewPos = player0 + diceValue;
        if (!(potentialNewPos > 99)) {
          setPlayer0(potentialNewPos);
        }
        console.log(player0);
      }
      else {
        var potentialNewPos = player1 + diceValue;
        if (!(potentialNewPos > 99)) {
          setPlayer1(potentialNewPos);
        }
        console.log(player1);
      }
      setDiceValue(0);
      setCurrentPlayer((currentPlayer+1)%2);
      setTurnInProgress(false);
    }
  }

  function giveDiceRoll() {
    if (turnInProgress) {
      if (currentPlayer == 0) {
        const potentialNewPos = player1 + diceValue;
        if (!(potentialNewPos > 99)) {
          setPlayer1(potentialNewPos);
        }
      }
      else {
        var potentialNewPos = player0 + diceValue;
        if (!(potentialNewPos > 99)) {
          setPlayer0(potentialNewPos);
        }
      }
      setDiceValue(0);
      setCurrentPlayer((currentPlayer+1)%2);
      setTurnInProgress(false);
    }
  }

  // When a user clicks a square, we check if the game is still in progress, and if the square is empty
  // If both are true, we draw the current player's symbol in the square and swap the current player
  function playTurn(pos) {
    if (winner === null) {
      if (gameState[pos] === null) {
        // Update the game board
        var newGameState = [...gameState]; // This makes a new array that contains all of the values in the gameState array
        newGameState[pos] = currentPlayer;
        setGameState(newGameState);
        // Change the current player
        if (currentPlayer === "X") {
          setCurrentPlayer("O");
        } else {
          setCurrentPlayer("X");
        }
      }
    }
  }

  // This checks if the values of the squares in 3 positions are all equal to each other
  // If they are, the value for each square is returned, otherwise, null is returned
  function checkLine(gameSquares) {
    if (
      gameState[gameSquares[0]] === gameState[gameSquares[1]] &&
      gameState[gameSquares[1]] === gameState[gameSquares[2]]
    ) {
      return gameState[gameSquares[0]];
    }
    return null;
  }

  // This checks all possible rows of length 3 in the grid to see if all values are equal
  // If a matching row is found with either all X or all O values, the winning player is returned
  function checkForWinner() {
    const winningRows = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    var winningPlayer = null;
    winningRows.forEach((row) => {
      const rowWinner = checkLine(row);
      if (rowWinner !== null) {
        winningPlayer = rowWinner;
      }
    });
    return winningPlayer;
  }

  // This returns true if all squares are filled, and returns false otherwise
  function checkForDraw() {
    var draw = true;
    gameState.forEach((gameSquare) => {
      if (gameSquare === null) {
        draw = false;
      }
    });
    return draw;
  }

  // This determines the text displayed beneath the game
  function displayGameText() {
    if (winner === null) {
      return "Current player: " + (currentPlayer+1);
    } else if (winner === "DRAW") {
      return "It's a draw!";
    } else {
      return "Player " + winner + " wins!";
    }
  }

  // This sets all state variables to their initial values
  function resetGame() {
    setCurrentPlayer(0);
    setPlayer0(0);
    setPlayer1(0);
  }

  // useEffect is called every time the gameState variable is updated, since it is included in the dependencies array parameter
  useEffect(() => {
    const possibleWinner = checkForWinner();
    if (possibleWinner !== null) {
      setWinner(possibleWinner);
    } else {
      const possibleDraw = checkForDraw();
      if (possibleDraw === true) {
        setWinner("DRAW");
      }
    }
  }, [gameState]);

  console.log('Before return 0: ',player0);
  console.log('Before return 1: ',player1)

  return (
    <div className="boardContainer">
      <div className="backgroundStyle">
        {
          //for each game square stored in gameState, create a square to display on the page
          gameState.map((_, pos) => {
            const cir0 = (pos == disToComp(player0)) ? (<div className="ball" style={{backgroundColor: "red"}}>1</div>) : null
            const cir1 = (pos == disToComp(player1)) ? (<div className="ball" style={{backgroundColor: "green"}}>2</div>) : null
            return (
              <div key={pos} className="empty">
                <div className="textInBox">
                  {compToDis(pos)}
                </div>
                {cir0}
                {cir1}
              </div>
            );
          })
        }
      </div>
      <div>{displayGameText()}</div>
      <div>
        <div className="button container">
          <button type="button" className="buttons" disabled={!turnInProgress} onClick={useDiceRoll}>Use dice roll</button>
          <button type="button" className="buttons" disabled={!turnInProgress} onClick={giveDiceRoll}>Give dice roll to opponent</button>
          <button type="button" className="buttons" disabled={turnInProgress} onClick={rollDice}>Roll Dice</button>
          <button type="button" className="buttons" disabled={turnInProgress} onClick={resetGame}>Reset Game</button>
        </div>
        <div className="diceResultBox">
          {diceValue}
        </div>
      </div>
    </div>
  );
}
