import Card from "./Card";
import { cards } from "../data/cards";
import { v4 as uuidv4 } from "uuid";
import React, { useState, useEffect } from "react";
import "../styles/card.css";

const CardContainer = () => {
  const [allCards, setAllCards] = useState([...cards, ...cards]);
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);
  const [firstElement, setFirstElement] = useState(null);
  const [secondElement, setSecondElement] = useState(null);
  const [, updateState] = useState();

  useEffect(() => {
    const updatedCards = allCards.map((card, index) => {
      return {
        ...card,
        id: index,
        marched: false,
        hidden: true,
      };
    });

    setAllCards([...updatedCards]);
  }, []);

  useEffect(() => {
    if (firstCard === secondCard && firstCard !== null && secondCard !== null) {
      setFirstCard(null);
      setSecondCard(null);

      setMatched(firstCard);
    } else if (
      firstCard !== secondCard &&
      firstCard !== null &&
      secondCard !== null
    ) {
      console.log("wrong");
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
  }, [firstCard, secondCard, firstElement, secondElement]);

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
          />
        );
      })}
    </div>
  );
};

export default CardContainer;
