import { ActionTree, MutationTree, GetterTree, ActionContext } from 'vuex'
import WardModal from '~/modals/ward_modal'
import { WardState } from './state'
import types from './types'

const mutations: MutationTree<WardState> = {
  [types.CREATE](state, wardModalList: WardModal[]) {
    state.wardModalList = wardModalList
  }
}

export default mutations
