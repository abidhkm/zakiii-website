import { combineReducers } from "redux";
import { article } from "./article";
import { articles } from "./articles";
import { articlesScene } from "./articles-scene";
import { book } from "./book";
import { books } from "./books";
import { booksScene } from "./books-scene";
import { covid19Scene } from "./covid-19-scene";
import { landingScene } from "./landing-scene";
import { projectsScene } from "./projects-scene";
import { readerScene } from "./reader-scene";
import { status } from "./status";

export const mainReducer = combineReducers({
  article,
  articles,
  articlesScene,
  book,
  books,
  booksScene,
  covid19Scene,
  landingScene,
  projectsScene,
  readerScene,
  status,
});
