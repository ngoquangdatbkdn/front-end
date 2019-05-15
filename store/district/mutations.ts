import { ActionTree, MutationTree, GetterTree, ActionContext } from 'vuex'
import DistrictModal from '~/modals/district_modal'
import { DistrictState } from './state'
import types from './types'

const mutations: MutationTree<DistrictState> = {
  [types.CREATE](state, districtModalList: DistrictModal[]) {
    state.districtModalList = districtModalList
  }
}

export default mutations
