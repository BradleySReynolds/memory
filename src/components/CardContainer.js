import Card from "./Card";
import { cards } from "../data/cards";
import { v4 as uuidv4 } from "uuid";
import React, { useState, useEffect } from "react";
import "../styles/card.css";

const CardContainer = (props) => {
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

  useEffect(() => {
    if (score === 12) {
      setIsRunning(false);
    }
  }, [score]);

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

  useEffect(() => {
    if (firstCard === secondCard && firstCard !== null && secondCard !== null) {
      setFirstCard(null);
      setSecondCard(null);
      setScore(score + 2);
      setMatched(firstCard);
    }

    if (firstCard !== null) {
      setHidden(firstElement, false);
      updateState([]);
    }

    if (secondCard !== null) {
      setHidden(secondElement, false);
    }

    if (firstCard !== secondCard && firstCard !== null && secondCard !== null) {
      setTimeout(() => {
        setHidden(firstElement, true);
        setHidden(secondElement, true);
        setFirstCard(null);
        setSecondCard(null);
      }, 1000);
    }
  }, [firstCard, secondCard, firstElement, secondElement, score]);

  const randomSort = (a, b) => {
    return Math.random() - 0.5;
  };

  const setMatched = (target) => {
    Object.entries(allCards).forEach(([key, value]) => {
      if (value.name === String(target)) {
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
  );
};

export default CardContainer;
