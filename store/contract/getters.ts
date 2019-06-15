import { ActionTree, MutationTree, GetterTree, ActionContext } from 'vuex'
import { RootState } from 'store'
import { ContractState } from './state'
// import {Common} from '~/modals'
const getters: GetterTree<ContractState, RootState> = {
  // getContracts: (state) => {
  //   return state.contracts
  // }
}
export default getters
