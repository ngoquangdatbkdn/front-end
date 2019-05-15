import { ActionTree, ActionContext } from 'vuex'
import { RootState } from 'store'
import types from './types'

export interface Actions<S, R> extends ActionTree<S, R> {
  setShouldOpenConfirmation(
    context: ActionContext<S, R>,
    shouldOpenConfirmation: boolean
  ): void;
  setConfirmation(context: ActionContext<S, R>, confirmation: any): void;
}

const actions: Actions<boolean, RootState> = {
  setShouldOpenConfirmation({ commit }, shouldOpenConfirmation: boolean) {
    commit(types.SET_SHOULD_OPEN, shouldOpenConfirmation)
  },
  setConfirmation({ commit }, confirmation: any) {
    commit(types.SET_CONFIRMATION, confirmation)
  }
}

export default actions
