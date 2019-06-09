import { ActionTree, MutationTree, GetterTree, ActionContext } from 'vuex'
import Common from '~/modals/business_type_modal'
import { BusinessState } from './state'
import types from './types'

const mutations: MutationTree<BusinessState> = {
  [types.FETCH_LIST](state, businesses: Common[]) {
    state.businesses = businesses
  }
}

export default mutations
