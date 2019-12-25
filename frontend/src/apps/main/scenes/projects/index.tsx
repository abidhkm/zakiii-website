import { Pagination } from "antd";
import React from "react";
import { connect } from "react-redux";
import { Project } from "t9/types/main/index";
import { Projects } from "./projects";
import "./style";

class ProjectsScene extends React.Component<ProjectsScenePropsReduxed, {}> {

  public render() {

    return (
      <div className="projects">
        <div className="projects-title">{"{|All projects|}"}</div>
        <Projects projects={this.props.projects} />
        <Pagination className="pagination" pageSize={9} showLessItems={true} total={3} />
      </div>
    );
  }
}

interface ProjectsScenePropsReduxed extends ProjectsSceneProps {
}

export interface ProjectsSceneProps {
  projects: Project[] | null;
}

export default connect
  (
    (state: {
      projectsScene: ProjectsSceneProps,
    }) => ({
      ...state.projectsScene,
    }),
  )
  (ProjectsScene);
