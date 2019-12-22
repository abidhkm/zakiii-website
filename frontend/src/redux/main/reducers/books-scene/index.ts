import { BooksSceneProps } from "t9/apps/main/scenes/books";
import { actionType } from "t9/redux/main/constants";

export const booksScene = (
  state: BooksSceneProps = {
    selectedKeys: null,
  },
  action: {
    type: string,
    payload: BooksSceneProps,
  }) => {
  switch (action.type) {
    case actionType.UPDATE_BOOKS_SCENE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
