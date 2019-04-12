import { ActionTree, MutationTree, GetterTree, ActionContext } from 'vuex'
import BusinessTypeModal from '~/modals/business_type_modal'
import { BusinessTypeState} from './state'
import types from './types'

 const mutations: MutationTree<BusinessTypeState> = {
  [types.CREATE] (state, businessTypeModalList: BusinessTypeModal[]) {
      state.businessTypeModalList = businessTypeModalList;
  },
}

export default mutations