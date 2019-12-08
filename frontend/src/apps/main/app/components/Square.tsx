import React from "react";

const style = ({ size, position, color }) => {
  const dim = size + "px";
  return {
    backgroundColor: color,
    height: dim,
    left: position.left + "px",
    position: "absolute",
    top: position.top + "px",
    transition: "all 0.1s ease",
    width: dim,
  };
};

export const Square = (props) => <div style={style(props) as unknown} />;
