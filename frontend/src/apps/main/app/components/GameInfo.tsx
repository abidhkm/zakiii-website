import React from "react";

const style = () => {
  return {
    container: {
      textAlign: "center",
    },
    info: {
      display: "flex",
      flexFlow: "row nowrap",
      justifyContent: "space-around",
    },
  };
};

export const GameInfo = ({
  timeElapsed,
  playerScore,
  highScore,
  globalHighScore = "Loading...",
}) => {
  const { container, info } = style();
  return (
    <div style={container as unknown}>
      <h3>Use arrows to move.</h3>
      <div style={info}>
        <p>Time: {timeElapsed}</p>
        <p>Score: {playerScore}</p>
      </div>
      <div style={info}>
        <p style={{ fontSize: "x-large" }}>High Score: {highScore}</p>
      </div>
    </div>
  );
};
