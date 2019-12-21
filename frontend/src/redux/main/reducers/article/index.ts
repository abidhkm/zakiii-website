import { actionType } from "t9/redux/main/constants";
import { Article } from "t9/types/main/index";

export const article = (
  state: Article | null = null,
  action: {
    type: string,
    payload: Article,
  }) => {
  switch (action.type) {
    case actionType.UPDATE_ARTICLE:
      return action.payload;
    default:
      return state;
  }
};
