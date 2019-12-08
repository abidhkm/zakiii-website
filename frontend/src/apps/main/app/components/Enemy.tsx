import React, { Component } from "react";
import { Square } from "./Square";

export class Enemy extends Component<EnemyProps> {
  public componentDidUpdate() {
    const { size, playerPosition, info: { top, left } } = this.props;

    if (playerPosition.left < (left + size) &&
      playerPosition.top < (top + size) &&
      (playerPosition.left + size) > left &&
      (playerPosition.top + size) > top) {

      this.props.onCollide();
    }
  }

  public render() {
    const { size, info: { top, left } } = this.props;

    return (
      <Square
        size={size}
        position={{ top, left }}
        color="firebrick"
      />
    );
  }
}

interface EnemyProps {
  size: number;
  playerPosition: {
    top: number;
    left: number;
  };
  info: {
    top: number;
    left: number;
  };
  onCollide: () => void;
}
