import { ActionTree, MutationTree, GetterTree, ActionContext } from 'vuex'
import {Common} from '~/modals'
import { ContractState } from './state'
import types from './types'

const mutations: MutationTree<ContractState> = {
  [types.FETCH_LIST](state, contracts: Common[]) {
    state.contracts = contracts
  }
}

export default mutations
