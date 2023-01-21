import React from "react";
import { Rotate } from "react-animated-components";
import NoughtsAndCrosses from "../../components/molecules/NoughtsAndCrosses/NoughtsAndCrosses";
import PongJH from "../../components/molecules/Pong JH/PongJH";

const Home = () => {
  return (
    <div className="home-root">
      <h1>Welcome to the Theodo UK Hackathon!</h1>
      <h2>This is the skeleton repository containing:</h2>
      <ul>
        <li>An example component (Header and Footer)</li>
        <li>An example image (Theodo Logo)</li>
        <li>An example button </li>
        <li>An example text input: </li>
      </ul>
      <h3>
        {" "}
        An example of an animated pie:{" "}
        <Rotate>
          {" "}
          <span>🥧</span>
        </Rotate>
      </h3>
      <div>
        <h3>An example game of Noughts and Crosses:</h3>
        <NoughtsAndCrosses />
      </div>

      <div>
        <h3>A new example game of bar that moves side to side</h3>
        <PongJH />
      </div>
    </div>
  );
};

export default Home;
