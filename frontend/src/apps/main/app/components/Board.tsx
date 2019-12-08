import React from "react";

const style = (dimension) => {
  const dim = dimension + "px";
  return {
    border: "1px solid black",
    height: dim,
    margin: "25px auto",
    overflow: "hidden",
    position: "relative",
    width: dim,
  };
};

export const Board = ({ dimension, children }) => (
  <div style={style(dimension) as unknown}>
    {children}
  </div>
);
