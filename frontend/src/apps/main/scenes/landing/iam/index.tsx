import { Button, Modal } from "antd";
import * as React from "react";
import { LinkV2 } from "src/components/link-v2";
import "./style";

const iam = [
  { title: "{|Developer|}", to: "/Developer", type: "primary" },
  { title: "{|Reader|}", to: "/Reader" },
  {
    onClick: () => {
      Modal.info({
        content: (
          <div>
            <p>{"{|Modal message|}"}</p>
          </div>
        ),
        title: "{|Modal title|}",
      });
    },
    title: "{|Astronaut|}",
    to: "#Astronaut",
  },
];

export const IAm: React.SFC<{}> = () => {
  return (
    <div className="iam">
      <div className="i-do">{"{|I do|}"}</div>
      {iam.map((a, i) => (
        <LinkV2 className="a" key={`iam-${i}`} to={a.to || ""}>
          <Button size={"large"} type={a.type as any} onClick={a.onClick} shape={"round"}>{a.title}</Button>
        </LinkV2>
      ))}
    </div>
  );
};
