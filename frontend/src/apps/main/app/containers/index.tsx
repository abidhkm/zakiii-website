import React, { Component } from "react";
import GitHubButton from 'react-github-btn'
import { Board } from "../components/Board";
import { DebugState } from "../components/DebugState";
import { Enemy } from "../components/Enemy";
import { GameInfo } from "../components/GameInfo";
import { Player } from "../components/Player";
import { DOWN, LEFT, RIGHT, UP } from "../helpers/constants";
import { pluck } from "../helpers/utils";

const getDefaultState = ({ boardSize, playerSize, highScore = 0 }) => {
  const half = Math.floor(boardSize / 2) * playerSize;
  return {
    activeEnemies: 1,
    baseScore: 10,
    enemyIndex: 0,
    enemySpeed: 5,
    highScore,
    playerScore: 0,
    positions: {
      enemies: [],
      player: {
        left: half,
        top: half,
      },
    },
    size: {
      board: boardSize,
      maxDim: boardSize * playerSize,
      player: playerSize,
    },
    timeElapsed: 0,
  };
};

export class Game extends Component<any, any> {
  public enemyInterval: number;
  public timeInterval: number;
  public gameInterval: number;
  public debug: any;

  constructor(props) {
    super(props);
    const { boardSize, playerSize } = props;
    this.state = getDefaultState({ boardSize, playerSize });
  }

  public placeEnemy = () => {
    const { player: playerPos } = this.state.positions;

    // assign to a random side
    const side = pluck([UP, DOWN, LEFT, RIGHT]);

    // generate enemy object
    const newEnemy = this.generateNewEnemy(playerPos, side);

    // add new enemy to state
    this.setState({
      positions: {
        ...this.state.positions,
        enemies: [...this.state.positions.enemies].concat(newEnemy),
      },
    });
  }

  public generateNewEnemy = (position, side) => {
    this.setState({
      enemyIndex: this.state.enemyIndex + 1,
    });

    const newEnemy = { key: this.state.enemyIndex, dir: side } as any;
    const { maxDim, player } = this.state.size;

    switch (side) {
      case UP:
        newEnemy.top = maxDim;
        newEnemy.left = position.left;
        break;
      case DOWN:
        newEnemy.top = 0 - player;
        newEnemy.left = position.left;
        break;
      case LEFT:
        newEnemy.top = position.top;
        newEnemy.left = maxDim;
        break;
      case RIGHT:
        newEnemy.top = position.top;
        newEnemy.left = 0 - player;
        break;
    }

    return newEnemy;
  }

  public handlePlayerMovement = (dirObj) => {
    const { top, left } = this.state.positions.player;
    const { player, maxDim } = this.state.size;

    // check walls
    switch (dirObj.dir) {
      case UP:
        if (top === 0) { return; }
        break;
      case DOWN:
        if (top === maxDim - player) { return; }
        break;
      case LEFT:
        if (left === 0) { return; }
        break;
      case RIGHT:
        if (left === maxDim - player) { return; }
        break;
    }

    this.setState({
      positions: {
        ...this.state.positions,
        player: {
          left: left + (player * dirObj.left),
          top: top + (player * dirObj.top),
        },
      },
    });
  }

  public handlePlayerCollision = () => {
    this.resetGame();
  }

  public startGame = () => {
    this.enemyInterval = setInterval(this.updateEnemyPositions, 50);
    this.timeInterval = setInterval(this.updateGame, 1000);
    this.gameInterval = setInterval(this.updateEnemiesInPlay, 250);
  }

  public updateGame = () => {
    const { timeElapsed } = this.state;

    this.updateTimeAndScore();

    if (timeElapsed > 0) {

      // increment enemy speed
      if (timeElapsed % 3 === 0) {
        this.incrementEnemySpeed();
      }

      // increment max active enemies every 10 seconds
      if (timeElapsed % 10 === 0) {
        this.incrementActiveEnemies();
      }
    }
  }

  public updateEnemyPositions = () => {
    const { enemySpeed, positions: { enemies }, size: { player, maxDim } } = this.state;

    this.setState({
      positions: {
        ...this.state.positions,
        enemies: enemies.filter((enemy) => !enemy.remove).map((enemy) => {
          if (enemy.top < (0 - player) ||
            enemy.top > maxDim + player ||
            enemy.left < (0 - player) ||
            enemy.left > maxDim + player) {
            enemy.remove = true;
            return enemy;
          }

          // based on direction, increment the correct value (top / left)
          switch (enemy.dir) {
            case UP:
              enemy.top -= enemySpeed;
              break;
            case DOWN:
              enemy.top += enemySpeed;
              break;
            case LEFT:
              enemy.left -= enemySpeed;
              break;
            case RIGHT:
              enemy.left += enemySpeed;
              break;
          }

          return enemy;
        }),
      },
    });
  }

  public updateEnemiesInPlay = () => {
    const { activeEnemies } = this.state;
    const { enemies } = this.state.positions;

    if (enemies.length < activeEnemies) {
      this.placeEnemy();
    }
  }

  public updateTimeAndScore = () => {
    const { timeElapsed, playerScore, baseScore } = this.state;

    this.setState({
      playerScore: playerScore + baseScore,
      timeElapsed: timeElapsed + 1,
    });
  }

  public incrementEnemySpeed = () => {
    const { enemySpeed } = this.state;

    this.setState({
      enemySpeed: parseFloat((enemySpeed + 0.25).toFixed(2)),
    });
  }

  public incrementActiveEnemies = () => {
    this.setState({
      activeEnemies: this.state.activeEnemies + 1,
    });
  }

  public resetGame = () => {
    const { boardSize, playerSize } = this.props;
    const { playerScore, highScore, globalHighScore, debug } = this.state;

    // clear intervals
    clearInterval(this.gameInterval);
    clearInterval(this.enemyInterval);
    clearInterval(this.timeInterval);

    // if high score is higher than global high score, update it
    if (playerScore > globalHighScore) {
      this.updateGlobalHighScore(playerScore);
    }

    // reset state
    this.setState({
      ...getDefaultState({ boardSize, playerSize, highScore }),
      // persist debug state and high scores
      debug,
      globalHighScore,
      highScore: playerScore > highScore ? playerScore : highScore,
    });
    // restart game
    this.startGame();

  }

  public handleDebugToggle = () => {
    this.setState({
      debug: this.debug.checked,
    });
  }

  public fetchGlobalHighScore = () => {
    // axios.get(url)
    //     .then(data => {
    //         this.setState({
    //             globalHighScore: data.data.fields.global_high_score
    //         })
    //     })
    //     .catch(err => console.warn(err))
  }

  public updateGlobalHighScore = (ghs: any) => {
    // axios.patch(url, {
    //     "fields": {
    //         "global_high_score": highScore
    //     }
    // })
    // .then(data => {
    //     this.setState({
    //         globalHighScore: data.data.fields.global_high_score
    //     });
    // })
    // .catch(err => console.warn(err))
  }

  public style = () => {
    return {
      margin: "0 auto",
      maxWidth: "600px",
      width: "85%",
    };
  }

  public render() {
    const {
      size: { board, player },
      positions: { player: playerPos },
      playerScore,
      timeElapsed,
      highScore,
      globalHighScore,
    } = this.state;

    return (
      <div style={this.style()}>
        <GameInfo
          playerScore={playerScore}
          timeElapsed={timeElapsed}
          highScore={highScore}
          globalHighScore={globalHighScore}
        />

        <Board dimension={board * player}>
          <Player
            size={player}
            position={playerPos}
            handlePlayerMovement={this.handlePlayerMovement}
          />

          {
            this.state.positions.enemies.map((enemy) => (
              <Enemy
                key={enemy.key}
                size={player}
                info={enemy}
                playerPosition={playerPos}
                onCollide={this.handlePlayerCollision}
              />
            ),
            )
          }
        </Board>
        {/* tslint:disable-next-line: max-line-length */}
        {false && <p style={{ position: "fixed", bottom: 0, left: 16 }}>Debug: <input type="checkbox" onChange={this.handleDebugToggle} ref={(n) => this.debug = n} /></p>}
        {this.state.debug && <DebugState data={this.state} />}
        <div style={{ textAlign: "center" }}>
          {/* tslint:disable-next-line: max-line-length */}
          <GitHubButton href="https://github.com/zibanpirate/zakiii-website" data-icon="octicon-star" data-size="large" data-show-count="true" aria-label="Star zibanpirate/zakiii-website on GitHub">Star</GitHubButton>
        </div>
      </div>
    );
  }

  public componentDidMount() {
    this.startGame();
    this.fetchGlobalHighScore();
  }

  public componentWillUnmount() {
    clearInterval(this.state.gameInterval);
    clearInterval(this.state.enemyInterval);
    clearInterval(this.state.timeInterval);
  }
}
