import { ActionTree, ActionContext } from 'vuex'
import { RootState } from 'store'
import types from './types'

export interface Actions<S, R> extends ActionTree<S, R> {
  setShouldOpenRegister(context: ActionContext<S, R>, shouldOpenRegister: boolean): void;
}

const actions: Actions<boolean, RootState> = {
  setShouldOpenRegister({ commit }, shouldOpenRegister: boolean) {
    commit(types.SET_SHOULD_OPEN, shouldOpenRegister)
  }
}

export default actions
