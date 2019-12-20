import { Icon } from "antd";
import * as React from "react";
import "./style";

export const GoTop: React.SFC<{}> = () => {
  return (
    <div className="go-top" onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); }}>
      <Icon type="up-circle" />
    </div>
  );
};
