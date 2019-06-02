import { ActionTree, MutationTree, GetterTree, ActionContext } from 'vuex'
import {Common} from '~/modals'
import { DistrictState } from './state'
import types from './types'

const mutations: MutationTree<DistrictState> = {
  [types.CREATE](state, districts: Common[]) {
    state.districts = districts
  }
}

export default mutations
