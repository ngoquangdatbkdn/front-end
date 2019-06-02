import { ActionTree, MutationTree, GetterTree, ActionContext } from 'vuex'
import { RootState } from 'store'
import { CityState } from './state'
import {Common} from '~/modals'
import types from './types'

export interface Actions<S, R> extends ActionTree<S, R> {
  create(context: ActionContext<S, R>, city: City): void;
}

const actions: Actions<CityState, RootState> = {
  create({ commit }, city: City) {
    commit(types.CREATE, city)
  }
}

export default actions
