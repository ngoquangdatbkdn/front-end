import { ActionTree, MutationTree, GetterTree, ActionContext } from 'vuex'
import CityModal from '~/modals/city_modal'
import { CityState } from './state'
import types from './types'

const mutations: MutationTree<CityState> = {
  [types.CREATE](state, cityModalList: CityModal[]) {
    state.cityModalList = cityModalList
  }
}

export default mutations
