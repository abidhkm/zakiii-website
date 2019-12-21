import Axios from "axios";
import { mainConfig } from "t9/apps/main/config";
import { actionType } from "t9/redux/main/constants";
import { OpsCB } from "t9/types/fe/template-types";
import { DispatchInterface as DI, MainStoreStateInterface as MSSI } from "t9/types/main/index";

export const fetchArticles = (cb?: OpsCB) => ((dispatch: DI, getState: MSSI) => {
  Axios.get(
    mainConfig.app.backendURL + "/{|language code|}/articles/list.json",
  ).then((res) => {
    if (res.data) {
      dispatch({ type: actionType.UPDATE_ARTICLES, payload: res.data });
    }
    if (cb) { cb(); }
  }).catch((err) => { if (cb) { cb({ message: err }); } });
});
