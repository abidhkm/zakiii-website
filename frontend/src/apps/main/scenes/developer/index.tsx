import { Button, Icon } from "antd";
import React from "react";
import { connect } from "react-redux";
import { LinkV2 } from "src/components/link-v2";
import { GoTop } from "../../components/go-top";
import { Article, Project } from "../../types";
import { LandingSceneProps } from "../landing";
import { Articles } from "./articles";
import { Header } from "./header";
import { Projects } from "./projects";
import "./style";

class DeveloperScene extends React.Component<DeveloperScenePropsReduxed, {}> {

  public render() {
    return (
      <div className="developer">
        <Header />
        <div className="intro">
          <div className="title">{"{|Intro title|}"}</div>
          {`{|Intro paragraph|}`.split("\n").map((p, i) => <p key={`p-${i}`}>{p}</p>)}
        </div>

        <div className="title">{"{|Recent projects|}"}</div>
        <Projects projects={this.props.recentProjects} />
        <div className="footer">
          <LinkV2 to={`/Projects`}>
            <Button type="link">{"{|See all projects|}".toUpperCase()}<Icon type="{|arrow right|}" /></Button>
          </LinkV2>
        </div>

        <div className="title">{"{|Recent articles|}"}</div>
        <Articles articles={this.props.recentArticles} />
        <div className="footer">
          <LinkV2 to={`/Articles`}>
            <Button type="link">{"{|See all articles|}".toUpperCase()}<Icon type="{|arrow right|}" /></Button>
          </LinkV2>
        </div>

        <GoTop />
      </div>
    );
  }
}

interface DeveloperScenePropsReduxed extends DeveloperSceneProps {
  recentArticles: Article[] | null;
  recentProjects: Project[] | null;
}

export interface DeveloperSceneProps {
}

export default connect
  (
    (state: {
      developerScene: DeveloperSceneProps,
      landingScene: LandingSceneProps,
    }) => ({
      ...state.developerScene,
      recentArticles: state.landingScene.recentArticles,
      recentProjects: state.landingScene.recentProjects,
    }),
  )
  (DeveloperScene);
