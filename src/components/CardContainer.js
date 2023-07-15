import Card from "./Card";
import { cards } from "../data/cards";
import { v4 as uuidv4 } from "uuid";
import React, { useState, useEffect } from "react";
import "../styles/card.css";
import Outro from "./Outro";

const CardContainer = (props) => {
  // Initialize States
  const [allCards, setAllCards] = useState([
    ...cards[props.mode],
    ...cards[props.mode],
  ]);
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);
  const [firstElement, setFirstElement] = useState(null);
  const [secondElement, setSecondElement] = useState(null);
  const [, updateState] = useState();
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [isGameover, setIsGameover] = useState(false);

  // Keeps track of Timer
  useEffect(() => {
    const interval = setInterval(() => {
      if (isRunning) {
        setTimer((prevSeconds) => prevSeconds + 1);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [isRunning]);

  // Checkes if Game is over by checking how many pairs remain.
  useEffect(() => {
    setTimeout(() => {
      if (score === 12) {
        setIsRunning(false);
        setIsGameover(true);
      }
    }, 500);
  }, [score]);

  // Gives each card a unique Id so that cards can be identified as unique entities despite have the same name and image.
  useEffect(() => {
    const updatedCards = allCards.map((card, index) => {
      return {
        ...card,
        id: index,
        marched: false,
        hidden: true,
      };
    });

    setAllCards([...updatedCards].sort(randomSort));
  }, []);

  // Game Logic
  useEffect(() => {
    // A match is found.
    if (firstCard === secondCard && firstCard !== null && secondCard !== null) {
      setFirstCard(null);
      setSecondCard(null);
      setMatched(firstCard);
    }

    // Card is selected but not have been yet
    if (firstCard !== null) {
      setHidden(firstElement, false);
      updateState([]);
    }

    // Card is selected when first has already been selected
    if (secondCard !== null) {
      setHidden(secondElement, false);
    }

    // Both Cards ahve been selected but they were not a match
    if (firstCard !== secondCard && firstCard !== null && secondCard !== null) {
      setTimeout(() => {
        setHidden(firstElement, true);
        setHidden(secondElement, true);
        setFirstCard(null);
        setSecondCard(null);
      }, 1000);
    }
  }, [firstCard, secondCard, firstElement, secondElement, score]);

  const randomSort = () => {
    return Math.random() - 0.5;
  };

  // Checks if cards have same name and dont have the same id
  const setMatched = (target) => {
    Object.entries(allCards).forEach(([key, value]) => {
      if (
        value.name === String(target) &&
        firstElement.id !== secondElement.id
      ) {
        setScore(score + 2);
        value.matched = true;
      }
    });
  };

  const setHidden = (target, bool) => {
    Object.entries(allCards).forEach(([key, value]) => {
      if (value.id === Number(target.getAttribute("id"))) {
        value.hidden = bool;
      }
    });
  };

  // Set states for different cards and elements
  const getCards = (e) => {
    if (firstCard === null) {
      setFirstElement(e.target);
      setFirstCard(e.target.getAttribute("spec"));
    } else if (firstCard !== null && secondCard === null) {
      setSecondElement(e.target);
      setSecondCard(e.target.getAttribute("spec"));
    }
  };

  return (
    <>
      {isGameover ? (
        <Outro name={props.name} score={timer} />
      ) : (
        <div className="game-container">
          <div className="info-container">
            <p className="info-para">Name: {props.name}</p>
            <p className="info-para">Remaining: {12 - score}</p>
            <p className="info-para">Timer: {timer}</p>
          </div>
          <div className="card-container" onClick={getCards}>
            {allCards.map((item) => {
              return (
                <Card
                  key={uuidv4()}
                  matched={item.matched}
                  hidden={item.hidden}
                  name={item.name}
                  id={item.id}
                  handleClick={getCards}
                  image={item.image}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default CardContainer;
