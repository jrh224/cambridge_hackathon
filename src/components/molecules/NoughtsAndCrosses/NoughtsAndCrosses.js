import React, { useEffect, useState } from "react";
import "./NoughtsAndCrosses.css";

export default function NoughtsAndCrosses() {
  // This represents the 3x3 grid - each item in the array corresponds to the symbol played in each of the 9 squares
  const [gameState, setGameState] = useState([
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ]);
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState(null);

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
    setGameState([null, null, null, null, null, null, null, null, null]);
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

  return (
    <div className="boardContainer">
      <div className="gameBoard">
        {
          //for each game square stored in gameState, create a square to display on the page
          gameState.map((squareValue, squareIndex) => {
            return (
              <div
                key={squareIndex}
                onClick={() => {
                  playTurn(squareIndex);
                }}
                className="gameSquare"
              >
                {squareValue}
              </div>
            );
          })
        }
      </div>
      <div>{displayGameText()}</div>
      <div>
        <button type="button" onClick={resetGame}>
          Reset Game
        </button>
      </div>
    </div>
  );
}
