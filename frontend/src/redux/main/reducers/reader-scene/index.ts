import { ReaderSceneProps } from "t9/apps/main/scenes/reader";
import { actionType } from "t9/redux/main/constants";

export const readerScene = (
  state: ReaderSceneProps = {
    favoriteBooks: null,
  },
  action: {
    type: string,
    payload: ReaderSceneProps,
  }) => {
  switch (action.type) {
    case actionType.UPDATE_READER_SCENE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
