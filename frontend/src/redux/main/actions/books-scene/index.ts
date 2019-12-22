import { OpsCB } from "t9/types/fe/template-types";
import { DispatchInterface as DI, MainStoreStateInterface as MSSI } from "t9/types/main/index";
import { actionType } from "../../constants";

export const resetSelectedBook = (cb?: OpsCB) => ((dispatch: DI, getState: MSSI) => {
  dispatch({ type: actionType.UPDATE_BOOKS_SCENE, payload: { selectedKeys: null } });
  if (cb) { cb(); }
});
