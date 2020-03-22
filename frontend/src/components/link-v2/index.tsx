import * as React from "react";
import { Link, LinkProps } from "react-router-dom";

export class LinkV2 extends React.PureComponent<LinkV2Props, {}> {
  public render() {
    return this.props.anchor
      ? <a {...this.props} href={window.globals.frontendBaseURL + this.props.to} />
      : <Link {...this.props} to={window.globals.frontendBaseURL + this.props.to} />
      ;
  }
}

interface LinkV2Props extends LinkProps {
  anchor?: boolean;
}
