import * as React from "react";
import { render } from "react-dom";
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
  <App />,
  document.getElementById("app-container"),
);

document.title = "{|page title|}";
