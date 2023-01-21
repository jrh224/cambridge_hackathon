import React, { useEffect, useState } from "react";
import "./SnakesAndLadders.css";

export default function SnakesAndLadders() {
  var newGameState = Array(100).fill(null);
  newGameState[0] = "AB";
  const [gameState, setGameState] = useState(newGameState);

  const [boardLayout] = useState(
    [99,98,97,96,95,94,93,92,91,90
    ,80,81,82,83,84,85,86,87,88,89
    ,79,78,77,76,75,74,73,72,71,70
    ,60,61,62,63,64,65,66,67,68,69
    ,59,58,57,56,55,54,53,52,51,50
    ,40,41,42,43,44,45,46,47,48,49
    ,39,38,37,36,35,34,33,32,31,30
    ,20,21,22,23,24,25,26,27,28,29
    ,19,18,17,16,15,14,13,12,11,10
    ,0,1,2,3,4,5,6,7,8,9])

  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [winner, setWinner] = useState(null);

  const [player1, setPlayer1] = useState(0);
  const [player2, setPlayer2] = useState(0);

  const [snakes, setSnakes] = useState([]);

  function initPlayer() {
      setPlayer1(0);
      setPlayer2(0);
  }

  function initSnakes() {

  }

  function getSnakes() {
      
  }

  const [diceValue, setDiceValue] = useState(0);

  const [turnInProgress, setTurnInProgress] = useState(false);


function rollDice() {
  if (!turnInProgress) {
    var min1 = Math.ceil(1);
    var max1 = Math.floor(7);
    var result = Math.floor(Math.random() * (max1 - min1) + min1); // The maximum is exclusive and the minimum is inclusive
    setDiceValue(result);
  }
}

function useDiceRoll() {
    
      setTurnInProgress(false);
  }

function giveRiceRoll() {

  setTurnInProgress(false);
}

  // When a user clicks a square, we check if the game is still in progress, and if the square is empty
  // If both are true, we draw the current player's symbol in the square and swap the current player
  function playTurn(squareIndex) {
    if (winner === null) {
      if (gameState[squareIndex] === null) {
        // Update the game board
        var newGameState = [...gameState]; // This makes a new array that contains all of the values in the gameState array
        newGameState[squareIndex] = currentPlayer;
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
      return "Current player: " + currentPlayer;
    } else if (winner === "DRAW") {
      return "It's a draw!";
    } else {
      return "Player " + winner + " wins!";
    }
  }

  // This sets all state variables to their initial values
  function resetGame() {
    var newGameState = Array(100).fill(null);
    newGameState[0] = "AB";
    setGameState(newGameState);
    
    setCurrentPlayer("X");
    setWinner(null);
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
  
  const backgroundStyle = {
    height: "500px",
    width: "500px",
    borderStyle: "solid",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: "2px",
    display: 'grid',
    gridTemplateRows: `repeat(10, 1fr)`,
    gridTemplateColumns: `repeat(10, 1fr)`,
    gridGap: "1px"
  }

  const other = {
    justifyContent: "center",
    backgroundColor: "#ececec",
  }
    
  const textInBox = {
    textAlign: "left",
    fontSize: "10px",
  }

  return (
    <div className="boardContainer">
      <div style={backgroundStyle}>
        {
          //for each game square stored in gameState, create a square to display on the page
          gameState.map((_, squareIndex) => {
            const p1 = (squareIndex == 54) ? (<div className="ball" style={{backgroundColor: "red"}}>1</div>) : null
            const p2 = (squareIndex == 55) ? (<div className="ball" style={{backgroundColor: "green"}}>2</div>) : null
            return (
              <div key={squareIndex} style={other}>
                <div style={textInBox}>
                  {boardLayout[squareIndex]+1}
                </div>
                {p1}
                {p2}
              </div>
            );
          })
        }
      </div>
      <div>{displayGameText()}</div>
      <div>
        <div className="button container">
          <button type="button" className="buttons" onClick={useDiceRoll}>Use dice roll</button>
          <button type="button" className="buttons" onClick={giveRiceRoll}>Give dice roll to opponent</button>
        </div>
        <div className="button container">
          <button type="button" className="buttons" onClick={rollDice}>Roll Dice</button>
          <button type="button" className="buttons" onClick={resetGame}>Reset Game</button>
        </div>
        <div className="diceResultBox">
          {diceValue}
        </div>
      </div>
    </div>
  );
}
