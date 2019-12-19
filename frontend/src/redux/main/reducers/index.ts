import { combineReducers } from "redux";
import { status } from "./status";

export const mainReducer = combineReducers({
  status,
});
