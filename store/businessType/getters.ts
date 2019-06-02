import { ActionTree, MutationTree, GetterTree, ActionContext } from 'vuex'
import { RootState } from 'store'
import { BusinessTypeState } from './state'

const getters: GetterTree<BusinessTypeState, RootState> = {
  getCommonList: (state) => {
    return state.businessTypes
  }
}
export default getters
