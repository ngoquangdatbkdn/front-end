import { ActionTree, MutationTree, GetterTree, ActionContext } from 'vuex'
import { RootState } from 'store'
import { CompanyState } from './state'
// import Company from '~/modals/company'
const getters: GetterTree<CompanyState, RootState> = {
  getCompany: (state) => {
    return state.company
  }
}
export default getters
