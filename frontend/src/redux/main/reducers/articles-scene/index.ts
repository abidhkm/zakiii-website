import { ArticlesSceneProps } from "t9/apps/main/scenes/articles";
import { actionType } from "t9/redux/main/constants";

export const articlesScene = (
  state: ArticlesSceneProps = {
    selectedKeys: null,
  },
  action: {
    type: string,
    payload: ArticlesSceneProps,
  }) => {
  switch (action.type) {
    case actionType.UPDATE_ARTICLES_SCENE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
