import { ActionTree, MutationTree, GetterTree, ActionContext } from 'vuex'
import Common from '~/modals/business_type_modal'
import { BusinessTypeState } from './state'
import types from './types'

const mutations: MutationTree<BusinessTypeState> = {
  [types.CREATE](state, businessTypes: Common[]) {
    state.businessTypes = businessTypes
  }
}

export default mutations
