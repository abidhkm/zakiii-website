import * as React from "react";
import "./style";

export const Header: React.SFC<{}> = () => {
  return (
    <div className="header" dir="ltr">
      <div className="bg" />
      <div className="fg">
        <div className="title">{"{|Title|}"}</div>
        <div className="subtitle">{"{|Subtitle|}"}</div>
        <div className="resume">{"{|Resume|}"}</div>
      </div>
    </div>
  );
};
