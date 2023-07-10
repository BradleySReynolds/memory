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
      <img
        className={`image-card ${props.hidden ? "hidden" : ""}`}
        src={props.image}
      />
    </div>
  );
};

export default Card;
