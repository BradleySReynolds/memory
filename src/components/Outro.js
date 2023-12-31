import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "../styles/outro.css";
import Intro from "./Intro";

const Outro = (props) => {
  // Call Local Storage for Previous Scores
  const storedData = localStorage.getItem("scores");

  // Initialize States
  const [playAgain, setPlayAgain] = useState(false);
  // If local storage exist set it as highscore, else use default.
  const [highscores, setHighscores] = useState(
    storedData
      ? JSON.parse(storedData)
      : [
          { name: "", score: 10000 },
          { name: "", score: 10000 },
          { name: "", score: 10000 },
          { name: "", score: 10000 },
          { name: "", score: 10000 },
          { name: "", score: 10000 },
          { name: "", score: 10000 },
          { name: "", score: 10000 },
          { name: "", score: 10000 },
          { name: "", score: 10000 },
        ]
  );

  const handleChange = () => {
    setPlayAgain(true);
  };

  // Shows the top 10 scores and sorts them least to greatest.
  useEffect(() => {
    if (highscores.length <= 10 || props.score < highscores[9].score) {
      const updatedHighscores = [...highscores];
      if (props.score < highscores[9].score) {
        updatedHighscores.pop();
      }
      updatedHighscores.push({ name: props.name, score: props.score });
      updatedHighscores.sort((a, b) => a.score - b.score);
      localStorage.setItem("scores", JSON.stringify(updatedHighscores));
      setHighscores(updatedHighscores);
    }
  }, []);

  return playAgain ? (
    <Intro />
  ) : (
    <div className="outro-container">
      <div className="highscores-container">
        <h2 className="highscore-head">High Scores</h2>
        <div className="highscores">
          {highscores.slice(0, 10).map((data, index) => {
            return (
              <div className="data-item" key={uuidv4()}>
                <p>
                  {data.score === 10000 ? "" : String(index + 1) + "."}{" "}
                  {data.name}
                </p>
                <p>{data.score === 10000 ? "" : data.score}</p>
              </div>
            );
          })}
        </div>
      </div>
      <button className="play-again-btn" onClick={handleChange}>
        Play Again
      </button>
    </div>
  );
};

export default Outro;
