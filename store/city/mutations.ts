import { ActionTree, MutationTree, GetterTree, ActionContext } from 'vuex'
import {Common} from '~/modals'
import { CityState } from './state'
import types from './types'

const mutations: MutationTree<CityState> = {
  [types.CREATE](state, cities: Common[]) {
    state.cities = cities
  }
}

export default mutations
