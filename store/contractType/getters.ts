import { ActionTree, MutationTree, GetterTree, ActionContext } from 'vuex'
import { RootState } from 'store'
import { ContractTypeState } from './state'
// import ContractTypeModal from '~/modals/contract_type_modal'
const getters: GetterTree<ContractTypeState, RootState> = {
  getContractTypeModalList: (state) => {
    return state.contractTypeModalList
  }
}
export default getters
