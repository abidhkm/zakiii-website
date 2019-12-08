import React, { Component } from "react";
import { DOWN, LEFT, RIGHT, UP } from "../helpers/constants";
import { Square } from "./Square";

export class Player extends Component<PlayerProps> {
  public handleKeyDown = (e) => {
    let newDirection: { top: number; left: number; dir: string; };

    switch (e.keyCode) {
      case 37:
        newDirection = { top: 0, left: -1, dir: LEFT };
        break;
      case 38:
        newDirection = { top: -1, left: 0, dir: UP };
        break;
      case 39:
        newDirection = { top: 0, left: 1, dir: RIGHT };
        break;
      case 40:
        newDirection = { top: 1, left: 0, dir: DOWN };
        break;
      default:
        return;
    }

    this.props.handlePlayerMovement(newDirection);
  }

  public render() {
    const { size, position: { top, left } } = this.props;

    return (
      <div ref={(n) => { (this as any).player = n; }} >
        <Square
          size={size}
          position={{ top, left }}
          color="darkgray"
        />
      </div>

    );
  }

  public componentDidMount() {
    window.onkeydown = this.handleKeyDown;
  }
}

interface PlayerProps {
  size: number;
  position: {
    top: number;
    left: number;
  };
  handlePlayerMovement: (newDirection: { top: number; left: number; dir: string; }) => void;
}
