import { LandingSceneProps } from "t9/apps/main/scenes/landing";
import { actionType } from "t9/redux/main/constants";

export const landingScene = (
  state: LandingSceneProps = {
    recentArticles: null,
  },
  action: {
    type: string,
    payload: LandingSceneProps,
  }) => {
  switch (action.type) {
    case actionType.UPDATE_LANDING_SCENE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
