import Axios from "axios";
import { mainConfig } from "t9/apps/main/config";
import { OpsCB } from "t9/types/fe/template-types";
import { DispatchInterface as DI, MainStoreStateInterface as MSSI } from "t9/types/main";
import { actionType } from "../../constants";

export const fetchStatistics = (cb?: OpsCB) => ((dispatch: DI, getState: MSSI) => {
  const fetchStatisticsLogic = (_cb?: OpsCB) => {
    Axios.get(
      mainConfig.app.origin + `/api/covid19`,
    ).then((res) => {
      if (res.data) {
        const timePassed = new Date().getTime() - new Date(res.data.lastUpdateTime).getTime();
        const hours = Math.floor(timePassed / 3600000);
        const minutes = Math.floor((timePassed - hours * 3600000) / 60000);

        dispatch({
          payload: {
            oldStatistics: getState().covid19Scene.statistics,
            statistics: {
              ...res.data,
              lastUpdateTime: (hours > 0 ? `${hours}h ` : "") + `${minutes}m ago`,
            },
          },
          type: actionType.UPDATE_COVID19_SCENE,
        });
        if (cb) { cb(); }
      }
    });
  };
  fetchStatisticsLogic(cb);
  window.setInterval(fetchStatisticsLogic, 10000);
});
