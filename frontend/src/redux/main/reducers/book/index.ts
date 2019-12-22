import { actionType } from "t9/redux/main/constants";
import { Book } from "t9/types/main/index";

export const book = (
  state: Book | null = null,
  action: {
    type: string,
    payload: Book,
  }) => {
  switch (action.type) {
    case actionType.UPDATE_BOOK:
      return action.payload;
    default:
      return state;
  }
};
