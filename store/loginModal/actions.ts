import { ActionTree, ActionContext } from "vuex";
import { RootState } from "store";
import types from "./types";

export interface Actions<S, R> extends ActionTree<S, R> {
  setShouldOpen(context: ActionContext<S, R>, shouldOpen: boolean): void;
}

const actions: Actions<boolean, RootState> = {
  setShouldOpen({ commit }, shouldOpen: boolean) {
    commit(types.SET_SHOULD_OPEN, shouldOpen);
  }
};

export default actions;
