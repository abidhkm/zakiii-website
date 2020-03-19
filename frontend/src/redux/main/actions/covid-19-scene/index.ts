import Axios from "axios";
import { mainConfig } from "t9/apps/main/config";
import { OpsCB } from "t9/types/fe/template-types";
import { DispatchInterface as DI, MainStoreStateInterface as MSSI } from "t9/types/main";
import { actionType } from "../../constants";

export const fetchStatistics = (cb?: OpsCB) => ((dispatch: DI, getState: MSSI) => {
  Axios.get(
    mainConfig.app.origin + `/api/covid19`,
  ).then((res) => {
    if (res.data) {
      dispatch({ type: actionType.UPDATE_COVID19_SCENE, payload: { statistics: res.data } });
    }
    if (cb) { cb(); }
  }).catch((err) => { if (cb) { cb({ message: err }); } });
});
