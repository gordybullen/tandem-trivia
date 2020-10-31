import React, { useState } from "react";
import "../styles/TriviaGame.css";
import TriviaQuestion from "./TriviaQuestion";

function TriviaGame() {
  const [start, setStart] = useState(false);

  const menu = () => {
    return (
      <>
        <h1 className="title">Welcome to Tandem Trivia!!!</h1>
        <button onClick={() => setStart(true)}>Start</button>
      </>
    );
  };

  return (
    <div className="game-container">
      {/* if we are at step 0, show the menu, otherwise start the trivia */}
      {!start ? menu() : <TriviaQuestion />}
    </div>
  );
}

export default TriviaGame;
