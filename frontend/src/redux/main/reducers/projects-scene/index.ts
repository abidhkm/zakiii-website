import { ProjectsSceneProps } from "t9/apps/main/scenes/projects";
import { actionType } from "t9/redux/main/constants";

export const projectsScene = (
  state: ProjectsSceneProps = {
    projects: null,
  },
  action: {
    type: string,
    payload: ProjectsSceneProps,
  }) => {
  switch (action.type) {
    case actionType.UPDATE_PROJECTS_SCENE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
