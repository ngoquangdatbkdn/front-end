import { ActionTree, MutationTree, GetterTree, ActionContext } from 'vuex'
import { RootState } from 'store'
import { BusinessState } from './state'

const getters: GetterTree<BusinessState, RootState> = {
  // getCommonList: (state) => {
  //   return state.businesses
  // }
}
export default getters
