import { ActionTree, ActionContext } from "vuex";
import { RootState } from "store";
import types from "./types";

export interface Actions<S, R> extends ActionTree<S, R> {
  setUserInfo(context: ActionContext<S, R>, userInfo: boolean): void;
}

const actions: Actions<boolean, RootState> = {
  setUserInfo({ commit }, userInfo: any) {
    commit(types.SET_USER_INFO, userInfo);
  }
};

export default actions;
