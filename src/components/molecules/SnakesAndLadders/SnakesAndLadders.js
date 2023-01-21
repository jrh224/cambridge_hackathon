import React, { useEffect, useState } from "react";
import "./SnakesAndLadders.css";
import kingImage from "./king2.png";
import knightImage from "./knight.png";

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
  const [shuffles, setShuffles] = useState([]);

  const [diceValue, setDiceValue] = useState('?');
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

  function initSnakesandLadders() {
    var num = Math.floor(Math.random()*(12-8)+8);
    var arr = new Array(100).fill(null);
    var path = [0,0];
    for (var i = 0; i < num; i++) {
      var split = 10*Math.floor(Math.random()*(10-1)+1);
      path[0] = Math.floor(Math.random()*(100-split)+split);
      path[1] = Math.floor(Math.random()*(split-1)+1);
      arr[path[0]] = path[1];

    }
    setSnakes(arr);

    num = Math.floor(Math.random()*(12-8)+8);
    arr = new Array(100).fill(null);
    path = [0,0];
    for (var i = 0; i < num; i++) {
      var split = 10*Math.floor(Math.random()*(10-1)+1);
      path[0] = Math.floor(Math.random()*(split-1)+1);
      if (snakes[path[0]] != null) {
        i--;
        continue;
      }
      path[1] = Math.floor(Math.random()*(100-split)+split);
      arr[path[0]] = path[1];
      console.log("ladders", split, path[0], path[1]);
    }
    setLadders(arr);
  }

  function initShuffles() {
    var arr = [];
    for (var i = 0; i < 2; i++) {
      arr.push(Math.floor(Math.random()*(90-10)+10));
    }
    setShuffles(arr);
  }

  // ----------------------------------------------

  // jQuery(document).ready(function() {
  //   var targetOption = {
  //     anchor: "LeftMiddle",
  //     maxConnections: 1,
  //     isSource: false,
  //     isTarget: true,
  //     reattach: true,
  //     endpoint: "Dot",
  //     connector: [ "Bezier", { curviness: 50 } ],
  //     setDragAllowedWhenFull: true
  //   };
  
  //   var sourceOption = {
  //     tolerance: "touch",
  //     anchor: "RightMiddle",
  //     maxConnections: 1,
  //     isSource: true,
  //     isTarget: false,
  //     reattach: true,
  //     endpoint: "Dot",
  //     connector: [ "Bezier", { curviness: 50 } ],
  //     setDragAllowedWhenFull: true
  //   };
  
  //   jsPlumb.importDefaults({
  //     ConnectionsDetachable: true,
  //     ReattachConnections: true,
  //     maxConnections: 1,
  //     Container: "backgroundStyle"
  //   });
  
  //   var questionEndpoints = []; // 'source' and 'target' endpoints
  
  //   // "source" click handler
  //   jQuery("#select_list_lebensbereiche ul > li").click(function() {
  //     //remove existing start endpoint, if any:
  //     jsPlumb.deleteEndpoint(questionEndpoints[0]);
  //     // add a new one on the clicked element:
  //     questionEndpoints[0] = jsPlumb.addEndpoint(jQuery(this), sourceOption);
  //     connectEndpoints();
  //   });
  
  //   // "target" endpoint
  //   jQuery("#select_list_wirkdimensionen ul > li").click(function() {
  //     if (!questionEndpoints[0]) return; // don't respond if a source hasn't been selected
  //     // remove existing endpoint if any
  //     jsPlumb.deleteEndpoint(questionEndpoints[1]);
  //     //create a new one:
  //     questionEndpoints[1] = jsPlumb.addEndpoint(jQuery(this), targetOption);
  //     connectEndpoints();
  //   });
  
  //   var connectEndpoints = function() {
  //     jsPlumb.connect({
  //       source: questionEndpoints[0],
  //       target: questionEndpoints[1]
  //     });
  //   }
  // });
  // ----------------------------------------------

  function rollDice() {
    if (!turnInProgress) {
      var result = Math.floor(Math.random() * 6 + 1);
      setDiceValue(result);
      setTurnInProgress(true);
    }
  }

  function editNewPos(player) {
    const current_pos = (player == 0) ? player0 : player1
    const pot_new_pos = current_pos + diceValue
    if (pot_new_pos > 99) return
    let new_pos = (snakes[pot_new_pos+1] ?? ladders[pot_new_pos+1]) ?? -1
    if (new_pos == -1) new_pos = pot_new_pos
    if (new_pos == 99) setWinner(player+1)
    if (player == 0) setPlayer0(new_pos)
    else setPlayer1(new_pos)
  }
  
  function useDiceRoll() {
    if (turnInProgress) {
      editNewPos(currentPlayer)
      setDiceValue('?');
      setCurrentPlayer((currentPlayer+1)%2);
      setTurnInProgress(false);
    }
  }

  function giveDiceRoll() {
    if (turnInProgress) {
      editNewPos((currentPlayer+1)%2)
      setDiceValue('?');
      setCurrentPlayer((currentPlayer+1)%2);
      setTurnInProgress(false);
    }
  }

  // This determines the text displayed beneath the game
  function displayGameText() {
    if (winner === null) {
      return currentPlayer == 0 ? "Current player: King" : "Current player: Knight"
    } else {
      return winner == 1 ? "King wins!" : "Knight wins!"
    }
  }

  // This sets all state variables to their initial values
  function resetGame() {
    setCurrentPlayer(0);
    setPlayer0(0);
    setPlayer1(0);
    initSnakesandLadders();
    initShuffles();
    setTurnInProgress(false);
    setDiceValue('?');
  }

  useEffect(() => {resetGame()}, []);

  return (
    <div className="boardContainer">
      <div className="backgroundStyle">
        {
          //for each game square stored in gameState, create a square to display on the page
          gameState.map((_, pos) => {
            const gotopos = (snakes[compToDis(pos)] ?? ladders[compToDis(pos)]) ?? -1
            const goto_text = gotopos - compToDis(pos) > 0 ? <div className="snakeText">Go To: {gotopos+1}</div>
             : <div className="snakeText" style={{color:"red"}}>Go To: {gotopos+1}</div>
            const goto = (gotopos != -1 && compToDis(pos) != 1)? goto_text : null
            // const cir0 = (pos == disToComp(player0)) ? (<div className="ball" style={{backgroundColor: "red"}}>1</div>) : null
            // const cir1 = (pos == disToComp(player1)) ? (<div className="ball" style={{backgroundColor: "green"}}>2</div>) : null

            const cir0 = (pos == disToComp(player0)) ? (<img id="kingSprite" height={35} src={kingImage}></img>) : null
            const cir1 = (pos == disToComp(player1)) ? (<img id="knightSprite" height={35} src={knightImage}></img>) : null
            const theodo = pos == 0 ? <h4>THEODO</h4> : null
            
            return (
              <div key={pos} className="empty">
                <div className="textInBox">
                  {compToDis(pos)}
                  {theodo}
                </div>
                {goto}
                {cir0}
                {cir1}
              </div>
            )
          })
        }
      </div>

      <div className="allButtons">
        <div className="allButtonsAgain">
          <div className={((currentPlayer==0) ? "player1text" : "player0text")}>{displayGameText()}</div>
          <div className="button container">
            <button type="button" className="buttons" disabled={!turnInProgress} onClick={useDiceRoll}>Use dice roll</button>
            <button type="button" className="buttons" disabled={!turnInProgress} onClick={giveDiceRoll}>Give dice roll to opponent</button>
          </div>
          <div className={(turnInProgress ? "inProgress" : "diceResultBox")} onClick={rollDice}>
            {diceValue}
          </div>
          <h4 className={(turnInProgress ? "inProgressh4" : "")}>Roll the dice above</h4>
          </div>
          <button type="button" className="resetButton" onClick={resetGame}>Reset Game</button>
        </div>
    </div>
  );
}
