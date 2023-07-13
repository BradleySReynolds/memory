import React, { useState } from "react";
import CardContainer from "./CardContainer";
import "../styles/intro.css";

const Intro = () => {
  const [name, setName] = useState("");
  const [mode, setMode] = useState("Fruits");
  const [renderComponent, setRenderComponent] = useState(false);

  const handleClick = () => {
    setRenderComponent(true);
  };

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleModeChange = (e) => {
    setMode(e.target.value);
  };

  return (
    <>
      {renderComponent ? (
        <CardContainer name={name} mode={mode} />
      ) : (
        <div className="intro-con">
          <h1 className="intro-head">Welcome to the Game of Memory</h1>
          <div className="input-con">
            <input
              className="intro-ipt"
              type="text"
              placeholder="Enter your name..."
              onChange={handleChange}
              maxLength={20}
            />
            <button className="intro-btn" onClick={handleClick}>
              Play
            </button>
          </div>
          <select onChange={handleModeChange}>
            <option>Fruit</option>
            <option>Vegetable</option>
            <option>Soda</option>
          </select>
        </div>
      )}
    </>
  );
};

export default Intro;
