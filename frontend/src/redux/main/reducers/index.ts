import { combineReducers } from "redux";
import { article } from "./article";
import { articles } from "./articles";
import { articlesScene } from "./articles-scene";
import { status } from "./status";

export const mainReducer = combineReducers({
  article,
  articles,
  articlesScene,
  status,
});
