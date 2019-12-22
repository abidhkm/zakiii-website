import React from "react";
import { connect } from "react-redux";
import { GoTop } from "../../components/go-top";
import { Article, Book } from "../../types";
import { Articles } from "./articles";
import { Books } from "./books";
import { Header } from "./header";
import { IDo } from "./ido";
import { Projects } from "./projects";
import "./style";

class LandingScene extends React.Component<LandingSceneProps, {}> {

  public render() {
    return (
      <div className="landing">
        <Header />
        <IDo />
        <Articles articles={this.props.recentArticles} />
        <Books books={this.props.recentBooks} />
        <Projects />
        <GoTop />
      </div>
    );
  }
}

export interface LandingSceneProps {
  recentArticles: Article[] | null;
  recentBooks: Book[] | null;
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
