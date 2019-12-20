import React from "react";
import { connect } from "react-redux";
import { GoTop } from "../../components/go-top";
import { Articles } from "./articles";
import { Books } from "./books";
import { Header } from "./header";
import { Projects } from "./projects";
import { IAm } from "./sections";
import "./style";

class LandingScene extends React.Component<LandingSceneProps, {}> {

  public render() {
    return (
      <div className="landing">
        <Header />
        <IAm />
        <Articles />
        <Books />
        <Projects />
        <GoTop />
      </div>
    );
  }
}

export interface LandingSceneProps {
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
