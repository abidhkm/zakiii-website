import { Button, Icon } from "antd";
import React from "react";
import { connect } from "react-redux";
import { LinkV2 } from "src/components/link-v2";
import { GoTop } from "../../components/go-top";
import { Book } from "../../types";
import { LandingSceneProps } from "../landing";
import { Books } from "./books";
import { Header } from "./header";
import "./style";

class ReaderScene extends React.Component<ReaderScenePropsReduxed, {}> {

  public render() {
    return (
      <div className="reader">
        <Header />
        <div className="intro">
          <div className="title">{"{|Intro title|}"}</div>
          {`{|Intro paragraph|}`.split("\n").map((p, i) => <p key={`p-${i}`}>{p}</p>)}
        </div>

        <div className="title">{"{|Favorite books|}"}</div>
        <Books books={this.props.favoriteBooks} />
        <div className="footer">
          <LinkV2 to={`/Books`}>
            <Button type="link">{"{|See all|}".toUpperCase()}<Icon type="{|arrow right|}" /></Button>
          </LinkV2>
        </div>

        <div className="title">{"{|Recent books|}"}</div>
        <Books books={this.props.recentBooks} />
        <div className="footer">
          <LinkV2 to={`/Books`}>
            <Button type="link">{"{|See all|}".toUpperCase()}<Icon type="{|arrow right|}" /></Button>
          </LinkV2>
        </div>

        <GoTop />
      </div>
    );
  }
}

interface ReaderScenePropsReduxed extends ReaderSceneProps {
  recentBooks: Book[] | null;
}

export interface ReaderSceneProps {
  favoriteBooks: Book[] | null;
}

export default connect
  (
    (state: {
      readerScene: ReaderSceneProps,
      landingScene: LandingSceneProps,
    }) => ({
      ...state.readerScene,
      recentBooks: state.landingScene.recentBooks,
    }),
  )
  (ReaderScene);
