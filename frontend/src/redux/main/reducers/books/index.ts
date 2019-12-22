import { actionType } from "t9/redux/main/constants";
import { Book } from "t9/types/main/index";

export const books = (
  state: Book[] | null = null,
  action: {
    type: string,
    payload: Book[],
  }) => {
  switch (action.type) {
    case actionType.UPDATE_BOOKS:
      return action.payload;
    default:
      return state;
  }
};
