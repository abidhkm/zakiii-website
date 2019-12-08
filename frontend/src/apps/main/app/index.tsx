import * as React from "react";
import { render } from "react-dom";
import { Game } from "./containers";
import "./style";

export const App: React.SFC<{}> = () => {
  return (
    <tbody>
      <tr>NavBar</tr>
      <tr className="wh-100">Body</tr>
      <tr>Footer</tr>
    </tbody>
  );
};

render(
  <Game boardSize={11} playerSize={25} />,
  document.getElementById("app-container"),
);
