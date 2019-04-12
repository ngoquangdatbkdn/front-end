import { ActionTree, MutationTree, GetterTree, ActionContext } from 'vuex'
import CompanyModal from '~/modals/company_modal'
import { CompanyState} from './state'
import types from './types'

 const mutations: MutationTree<CompanyState> = {
  [types.CREATE] (state, companyModal: CompanyModal) {
      state.companyModal = companyModal;
  },
}

export default mutations