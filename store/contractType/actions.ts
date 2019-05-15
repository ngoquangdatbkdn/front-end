import { ActionTree, MutationTree, GetterTree, ActionContext } from 'vuex'
import { RootState } from 'store'
import { ContractTypeState } from './state'
import ContractTypeModal from '~/modals/contract_type_modal'
import types from './types'

export interface Actions<S, R> extends ActionTree<S, R> {
  create(context: ActionContext<S, R>, contractTypeModal: ContractTypeModal): void;
}

const actions: Actions<ContractTypeState, RootState> = {
  create({ commit }, contractTypeModal: ContractTypeModal) {
    commit(types.CREATE, contractTypeModal)
  }
}

export default actions
