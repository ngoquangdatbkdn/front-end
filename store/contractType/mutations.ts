import { ActionTree, MutationTree, GetterTree, ActionContext } from 'vuex'
import ContractTypeModal from '~/modals/contract_type_modal'
import { ContractTypeState } from './state'
import types from './types'

const mutations: MutationTree<ContractTypeState> = {
  [types.CREATE](state, contractTypeModalList: ContractTypeModal[]) {
    state.contractTypeModalList = contractTypeModalList
  }
}

export default mutations
