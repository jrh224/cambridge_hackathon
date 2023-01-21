import React, { useEffect, useState } from "react";
import "./Sprites.css";

const [player1, setPlayer1] = useState(0);
const [player2, setPlayer2] = useState(0);

const [snakes, setSnakes] = useState([]);

export function initPlayer() {
    setPlayer1(0);
    setPlayer2(0);
}

export function initSnakes() {

}

export function getSnakes() {
    
}
