import { ActionTree, MutationTree, GetterTree, ActionContext } from 'vuex'
import { RootState } from 'store'
import { DistrictState } from './state'
import {Common} from '~/modals'
import types from './types'

export interface Actions<S, R> extends ActionTree<S, R> {
  create(context: ActionContext<S, R>, district: Common): void;
}

const actions: Actions<DistrictState, RootState> = {
  create({ commit }, district: Common) {
    commit(types.CREATE, district)
  }
}

export default actions
