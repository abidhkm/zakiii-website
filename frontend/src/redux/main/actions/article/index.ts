import Axios from "axios";
import { getUrlNodeByLevel } from "src/common/utils";
import { mainConfig } from "t9/apps/main/config";
import { actionType } from "t9/redux/main/constants";
import { OpsCB } from "t9/types/fe/template-types";
import { DispatchInterface as DI, MainStoreStateInterface as MSSI } from "t9/types/main/index";

export const fetchArticle = (cb?: OpsCB) => ((dispatch: DI, getState: MSSI) => {
  const articleSlug = getUrlNodeByLevel(2, window.globals.nextURL).substring(1);
  Axios.get(
    mainConfig.app.backendURL + `/{|language code|}/articles/${articleSlug}.json`,
  ).then((res) => {
    if (res.data) {
      dispatch({ type: actionType.UPDATE_ARTICLES_SCENE, payload: { selectedKeys: res.data.slug } });
      dispatch({ type: actionType.UPDATE_ARTICLE, payload: res.data });
    }
    if (cb) { cb(); }
  }).catch((err) => { if (cb) { cb({ message: err }); } });
});
