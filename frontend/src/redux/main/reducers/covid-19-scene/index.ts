import { COVID19SceneProps } from "t9/apps/main/scenes/covid-19";
import { actionType } from "t9/redux/main/constants";

export const covid19Scene = (
  state: COVID19SceneProps = {
    statistics: null,
  },
  action: {
    type: string,
    payload: COVID19SceneProps,
  }) => {
  switch (action.type) {
    case actionType.UPDATE_COVID19_SCENE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
