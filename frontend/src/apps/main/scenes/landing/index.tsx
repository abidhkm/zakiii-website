import React from "react";
import { connect } from "react-redux";
import { GoTop } from "../../components/go-top";
import { Article } from "../../types";
import { Articles } from "./articles";
import { Books } from "./books";
import { Header } from "./header";
import { IAm } from "./iam";
import { Projects } from "./projects";
import "./style";

class LandingScene extends React.Component<LandingSceneProps, {}> {

  public render() {
    return (
      <div className="landing">
        <Header />
        <IAm />
        <Articles articles={this.props.recentArticles} />
        <Books />
        <Projects />
        <GoTop />
      </div>
    );
  }
}

export interface LandingSceneProps {
  recentArticles: Article[] | null;
}

export default connect
  (
    (state: {
      landingScene: LandingSceneProps,
    }) => ({
      ...state.landingScene,
    }),
  )
  (LandingScene);
