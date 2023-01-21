import React from "react";
import { Rotate } from "react-animated-components";
import SnakesAndLadders from "../../components/molecules/SnakesAndLadders/SnakesAndLadders";

const Home = () => {
  return (
    <div className="home-root">
      <div>
        <SnakesAndLadders />
      </div>
    </div>
  );
};

export default Home;
