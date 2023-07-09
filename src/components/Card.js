import React from "react";
import "../styles/card.css";

const Card = (props) => {
  return (
    <div
      className={`card ${props.matched ? "matched" : ""}`}
      id={props.id}
      spec={props.name}
      onClick={props.handleClick}
    >
      <h1 className={`${props.hidden ? "hidden" : ""}`}>{props.name}</h1>
    </div>
  );
};

export default Card;
