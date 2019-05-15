import { ActionTree, MutationTree, GetterTree, ActionContext } from 'vuex'
import { RootState } from 'store'
import { Person, State } from './state'
import types from './types'

export interface Actions<S, R> extends ActionTree<S, R> {
  select (context: ActionContext<S, R>, id: number): void
}

const actions: Actions<State, RootState> = {
  select({ commit }, id: number) {
    commit(types.SELECT, id)
  }
}

export default actions
