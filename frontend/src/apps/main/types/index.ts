import { mainStore } from "t9/redux/main";

export type LandingLoaded = boolean;

export type MainStoreStateInterface = typeof mainStore.getState;

type MainThunkInterface = (dispatch: DispatchInterface, getState: MainStoreStateInterface) => void;

export type DispatchInterface =
  (action: { type: string, payload?: object } | MainThunkInterface) => void;

export interface Article {
  title: string;
  slug: string;
  description?: string;
  image?: string;
  content?: string;
}

export interface Book {
  title: string;
  slug: string;
  description?: string;
  authors?: string;
  image?: string;
  content?: string;
}

export interface Project {
  name: string;
  description: string;
  image: string;
  link: string;
  slug: string;
  logo: string;
  owner: {
    name: string;
  };
}
