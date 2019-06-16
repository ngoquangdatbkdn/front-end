import { ActionTree, MutationTree, GetterTree, ActionContext } from 'vuex'
import {Common} from '~/modals'
import { LevelState } from './state'
import types from './types'

const mutations: MutationTree<LevelState> = {
  [types.FETCH_LIST](state, levels: Common[]) {
    state.levels = levels
  }
}

export default mutations
